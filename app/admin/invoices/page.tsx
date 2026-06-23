"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Receipt, Plus } from "lucide-react"

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ invoiceNumber: "", totalAmount: 0, userId: "", status: "draft" })

  useEffect(() => {
    async function load() {
      const { adminGetAllInvoices, getAllUsers } = await import("@/lib/actions/admin")
      setInvoices(await adminGetAllInvoices())
      setClients(await getAllUsers())
      setLoading(false)
    }
    load()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const { createInvoice } = await import("@/lib/actions/billing")
    await createInvoice({ ...form, status: form.status as any, subtotal: form.totalAmount, amountPaid: 0, balanceDue: form.totalAmount } as any)
    setOpen(false)
    setForm({ invoiceNumber: "", totalAmount: 0, userId: "", status: "draft" })
    const { adminGetAllInvoices } = await import("@/lib/actions/admin")
    setInvoices(await adminGetAllInvoices())
  }

  async function handleStatusChange(id: string, status: string) {
    const { updateInvoice } = await import("@/lib/actions/billing")
    await updateInvoice(id, { status: status as any })
    const { adminGetAllInvoices } = await import("@/lib/actions/admin")
    setInvoices(await adminGetAllInvoices())
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-semibold">Invoices</h1><p className="text-sm text-muted-foreground">Manage invoices</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Create Invoice</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Invoice</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2"><Label>Invoice Number</Label><Input value={form.invoiceNumber} onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Client</Label><Select value={form.userId} onValueChange={(v) => setForm({ ...form, userId: v })}><SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger><SelectContent>{clients.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>Amount (paise)</Label><Input type="number" value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: Number(e.target.value) })} required /></div>
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : invoices.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><Receipt className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No invoices</p></CardContent></Card>
      ) : (
        <div className="space-y-2">
          {invoices.map((inv: any) => (
            <Card key={inv.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-medium">#{inv.invoiceNumber}</p>
                  <p className="text-xs text-muted-foreground">₹{(inv.totalAmount / 100).toLocaleString()} - {new Date(inv.createdAt).toLocaleDateString()}</p>
                </div>
                <Select defaultValue={inv.status} onValueChange={(v) => handleStatusChange(inv.id, v)}>
                  <SelectTrigger className="w-36 h-7 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["draft", "sent", "partially_paid", "paid", "overdue", "cancelled"].map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
