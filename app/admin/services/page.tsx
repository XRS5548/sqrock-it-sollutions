"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Layers, Plus, Pencil, Trash2 } from "lucide-react"

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState({ name: "", slug: "", description: "", shortDescription: "", startingPrice: 0 })

  useEffect(() => {
    async function load() {
      const { adminGetServices } = await import("@/lib/actions/admin")
      const data = await adminGetServices()
      setServices(data.services)
      setCategories(data.categories)
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const { createService, updateService } = await import("@/lib/actions/services")
    if (editItem) {
      await updateService(editItem.id, form)
    } else {
      await createService(form as any)
    }
    setEditOpen(false)
    setEditItem(null)
    setForm({ name: "", slug: "", description: "", shortDescription: "", startingPrice: 0 })
    const { adminGetServices } = await import("@/lib/actions/admin")
    const svcData = await adminGetServices()
    setServices(svcData.services)
  }

  function openEdit(item: any) {
    setEditItem(item)
    setForm({ name: item.name, slug: item.slug, description: item.description || "", shortDescription: item.shortDescription || "", startingPrice: item.startingPrice || 0 })
    setEditOpen(true)
  }

  async function handleDelete(id: string) {
    const { deleteService } = await import("@/lib/actions/services")
    await deleteService(id)
    const { adminGetServices } = await import("@/lib/actions/admin")
    const svcData = await adminGetServices()
    setServices(svcData.services)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-semibold">Services</h1><p className="text-sm text-muted-foreground">Manage your service offerings</p></div>
        <Dialog open={editOpen} onOpenChange={(o) => { setEditOpen(o); if (!o) { setEditItem(null); setForm({ name: "", slug: "", description: "", shortDescription: "", startingPrice: 0 }) } }}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Add Service</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? "Edit Service" : "New Service"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Short Description</Label><Input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="space-y-2"><Label>Starting Price (in paise)</Label><Input type="number" value={form.startingPrice} onChange={(e) => setForm({ ...form, startingPrice: Number(e.target.value) })} /></div>
              <Button type="submit">{editItem ? "Update" : "Create"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-32" /></Card>)}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s: any) => (
            <Card key={s.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{s.name}</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(s)}><Pencil className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(s.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.shortDescription || s.description?.slice(0, 100)}</p>
                {s.startingPrice > 0 && <p className="text-sm font-medium mt-2">From ₹{s.startingPrice}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
