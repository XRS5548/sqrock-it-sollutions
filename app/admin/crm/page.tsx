"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Plus, Mail, Phone, Building2 } from "lucide-react"

export default function CrmPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", description: "" })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      const { getLeads } = await import("@/lib/actions/crm")
      setLeads(await getLeads())
      setLoading(false)
    }
    load()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const { createLead } = await import("@/lib/actions/crm")
    await createLead(form)
    setOpen(false)
    setForm({ name: "", email: "", phone: "", company: "", description: "" })
    setSubmitting(false)
    const { getLeads } = await import("@/lib/actions/crm")
    setLeads(await getLeads())
  }

  async function handleStatusChange(leadId: string, status: string) {
    const { updateLeadStatus } = await import("@/lib/actions/crm")
    await updateLeadStatus(leadId, status, "admin")
    const { getLeads } = await import("@/lib/actions/crm")
    setLeads(await getLeads())
  }

  const groupedLeads = {} as Record<string, any[]>
  for (const lead of leads) {
    const status = lead.leadStatus || "new"
    if (!groupedLeads[status]) groupedLeads[status] = []
    groupedLeads[status].push(lead)
  }

  const statuses = ["new", "contacted", "qualified", "proposal", "negotiation", "won", "lost"]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-semibold">CRM / Leads</h1><p className="text-sm text-muted-foreground">Manage your sales pipeline</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Add Lead</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Lead</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2"><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="space-y-2"><Label>Company</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <Button type="submit" disabled={submitting}>{submitting ? "Adding..." : "Add Lead"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-64" /></Card>)}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-x-auto">
          {statuses.map((status) => (
            <div key={status} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold capitalize">{status}</h3>
                <Badge variant="secondary">{groupedLeads[status]?.length ?? 0}</Badge>
              </div>
              <div className="space-y-2">
                {(groupedLeads[status] ?? []).map((lead: any) => (
                  <Card key={lead.id} className="hover:bg-accent/50 transition-colors">
                    <CardContent className="py-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{lead.name}</p>
                        <Badge variant="secondary" className="capitalize">{lead.leadStatus}</Badge>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {lead.email && <p className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</p>}
                        {lead.phone && <p className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</p>}
                        {lead.company && <p className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {lead.company}</p>}
                      </div>
                      <Select defaultValue={lead.leadStatus} onValueChange={(v) => handleStatusChange(lead.id, v)}>
                        <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {statuses.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
