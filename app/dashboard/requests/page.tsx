"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"
import { motion } from "framer-motion"

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  approved: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-500",
  cancelled: "bg-red-500/10 text-red-500",
}

export default function RequestsPage() {
  const { data: session } = authClient.useSession()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) return
      const { getDashboardServiceRequests } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardServiceRequests(session.user.id)
      setRequests(data)
      setLoading(false)
    }
    load()
  }, [session])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Service Requests</h1>
          <p className="text-sm text-muted-foreground">Manage your service requests</p>
        </div>
        <Link href="/dashboard/requests/new">
          <Button><Plus className="h-4 w-4 mr-2" /> New Request</Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : requests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No requests yet</p>
            <p className="text-sm text-muted-foreground mb-4">Create your first service request</p>
            <Link href="/dashboard/requests/new"><Button>New Request</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {requests.map((req: any) => (
            <Card key={req.id} className="hover:bg-accent/50 transition-colors">
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{req.title}</p>
                  <p className="text-sm text-muted-foreground">{req.description?.slice(0, 100)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(req.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge variant="secondary" className={statusColors[req.status]}>{req.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
