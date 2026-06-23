"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id!
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [ticket, setTicket] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    async function load() {
      const { getDashboardTicket } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardTicket(id)
      setTicket(data)
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!session?.user?.id || !message.trim()) return
    setSending(true)
    const { addTicketMessage } = await import("@/lib/actions/support")
    await addTicketMessage({ ticketId: id, userId: session.user.id, content: message, isInternal: false } as any)
    setMessage("")
    setSending(false)
    const { getDashboardTicket } = await import("@/lib/actions/dashboard-data")
    setTicket(await getDashboardTicket(id))
  }

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-32" /><Skeleton className="h-64" /></div>
  if (!ticket) return <div className="text-center py-12">Ticket not found</div>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tickets"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{ticket.subject}</h1>
          <p className="text-sm text-muted-foreground">{new Date(ticket.createdAt).toLocaleString()}</p>
        </div>
        <Badge variant="secondary">{ticket.status.replace(/_/g, " ")}</Badge>
      </div>

      {ticket.description && (
        <Card>
          <CardContent className="py-4">
            <p className="text-sm">{ticket.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Messages ({ticket.messages?.length ?? 0})</h2>
        {ticket.messages?.map((msg: any) => (
          <Card key={msg.id}>
            <CardContent className="py-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{msg.userId?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ticket.status !== "closed" && ticket.status !== "resolved" && (
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your reply..." className="flex-1" rows={2} />
          <Button type="submit" disabled={sending || !message.trim()}><Send className="h-4 w-4" /></Button>
        </form>
      )}
    </motion.div>
  )
}
