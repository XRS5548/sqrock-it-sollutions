"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Users, Mail, Phone, Building2 } from "lucide-react"

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { getClients } = await import("@/lib/actions/admin")
      setClients(await getClients())
      setLoading(false)
    }
    load()
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-2xl font-semibold">Clients</h1><p className="text-sm text-muted-foreground">All registered clients</p></div>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-24" /></Card>)}</div>
      ) : clients.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><Users className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No clients yet</p></CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((c: any) => (
            <Card key={c.id}>
              <CardContent className="flex items-start gap-3 py-4">
                <Avatar className="h-10 w-10"><AvatarFallback>{c.name?.charAt(0) || "U"}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> {c.email}</p>
                  {c.phone && <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> {c.phone}</p>}
                  {c.company && <p className="text-xs text-muted-foreground flex items-center gap-1"><Building2 className="h-3 w-3" /> {c.company}</p>}
                </div>
                <Badge variant="secondary">{c.role}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
