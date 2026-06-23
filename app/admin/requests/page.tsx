"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-500", pending: "bg-yellow-500/10 text-yellow-500",
  approved: "bg-green-500/10 text-green-500", rejected: "bg-red-500/10 text-red-500", cancelled: "bg-red-500/10 text-red-500",
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { adminGetAllRequests } = await import("@/lib/actions/admin")
      setRequests(await adminGetAllRequests())
      setLoading(false)
    }
    load()
  }, [])

  async function handleStatusChange(id: string, status: string) {
    const { updateRequest } = await import("@/lib/actions/services")
    await updateRequest(id, { status: status as any })
    const { adminGetAllRequests } = await import("@/lib/actions/admin")
    setRequests(await adminGetAllRequests())
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-2xl font-semibold">All Requests</h1><p className="text-sm text-muted-foreground">Manage client service requests</p></div>
      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : requests.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><FileText className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No requests</p></CardContent></Card>
      ) : (
        <div className="space-y-2">
          {requests.map((req: any) => (
            <Card key={req.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-medium">{req.title}</p>
                  <p className="text-xs text-muted-foreground">{req.description?.slice(0, 100)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(req.createdAt).toLocaleDateString()}</p>
                </div>
                <Select defaultValue={req.status} onValueChange={(v) => handleStatusChange(req.id, v)}>
                  <SelectTrigger className="w-32 h-7 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["draft", "pending", "approved", "rejected", "cancelled"].map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
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
