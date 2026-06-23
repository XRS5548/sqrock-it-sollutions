"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, TicketCheck, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const statusColors: Record<string, string> = {
  open: "bg-green-500/10 text-green-500",
  in_progress: "bg-blue-500/10 text-blue-500",
  waiting_on_client: "bg-yellow-500/10 text-yellow-500",
  waiting_on_team: "bg-orange-500/10 text-orange-500",
  resolved: "bg-gray-500/10 text-gray-500",
  closed: "bg-gray-500/10 text-gray-500",
}

export default function TicketsPage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) return
      const { getDashboardTickets } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardTickets(session.user.id)
      setTickets(data)
      setLoading(false)
    }
    load()
  }, [session])

  async function handleCreateTicket(e: React.FormEvent) {
    e.preventDefault()
    if (!session?.user?.id) return
    setSubmitting(true)
    const { createTicket } = await import("@/lib/actions/support")
    await createTicket({ userId: session.user.id, subject, description, status: "open" } as any)
    setOpen(false)
    setSubject("")
    setDescription("")
    setSubmitting(false)
    const { getDashboardTickets } = await import("@/lib/actions/dashboard-data")
    setTickets(await getDashboardTickets(session.user.id))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Support Tickets</h1>
          <p className="text-sm text-muted-foreground">Get help from our team</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> New Ticket</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Support Ticket</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief description of the issue" required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide details about your issue" rows={4} />
              </div>
              <Button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create Ticket"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : tickets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <TicketCheck className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No tickets yet</p>
            <p className="text-sm text-muted-foreground">Create a ticket to get support</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tickets.map((t: any) => (
            <Link key={t.id} href={`/dashboard/tickets/${t.id}`}>
              <Card className="hover:bg-accent/50 transition-colors">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3 flex-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{t.subject}</p>
                      <p className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={statusColors[t.status]}>{t.status.replace(/_/g, " ")}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  )
}
