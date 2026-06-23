"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { TicketCheck } from "lucide-react"

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { adminGetAllTickets } = await import("@/lib/actions/admin")
      setTickets(await adminGetAllTickets())
      setLoading(false)
    }
    load()
  }, [])

  async function handleUpdate(id: string, data: any) {
    const { updateTicket } = await import("@/lib/actions/support")
    await updateTicket(id, data)
    const { adminGetAllTickets } = await import("@/lib/actions/admin")
    setTickets(await adminGetAllTickets())
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-2xl font-semibold">Support Tickets</h1><p className="text-sm text-muted-foreground">Manage support tickets</p></div>
      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : tickets.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><TicketCheck className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No tickets</p></CardContent></Card>
      ) : (
        <div className="space-y-2">
          {tickets.map((t: any) => (
            <Card key={t.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue={t.status} onValueChange={(v) => handleUpdate(t.id, { status: v })}>
                    <SelectTrigger className="w-32 h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["open", "in_progress", "waiting_on_client", "waiting_on_team", "resolved", "closed"].map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">{s.replace(/_/g, " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue={t.priority} onValueChange={(v) => handleUpdate(t.id, { priority: v })}>
                    <SelectTrigger className="w-28 h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["low", "medium", "high", "urgent"].map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
