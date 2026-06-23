"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Users, ShieldCheck } from "lucide-react"

export default function AdminTeamPage() {
  const [team, setTeam] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { getTeam } = await import("@/lib/actions/admin")
      setTeam(await getTeam())
      setLoading(false)
    }
    load()
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-2xl font-semibold">Team Management</h1><p className="text-sm text-muted-foreground">Manage your team members</p></div>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">{[1, 2].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-24" /></Card>)}</div>
      ) : team.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><Users className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No team members</p></CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {team.map((m: any) => (
            <Card key={m.id}>
              <CardContent className="flex items-center gap-3 py-4">
                <Avatar className="h-10 w-10"><AvatarFallback>{m.name?.charAt(0) || "U"}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <p className="font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                <ShieldCheck className="h-4 w-4 text-primary" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
