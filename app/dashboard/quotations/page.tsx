"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-500",
  sent: "bg-blue-500/10 text-blue-500",
  viewed: "bg-yellow-500/10 text-yellow-500",
  accepted: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-500",
  expired: "bg-orange-500/10 text-orange-500",
}

export default function QuotationsPage() {
  const { data: session } = authClient.useSession()
  const [quotations, setQuotations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) return
      const { getDashboardQuotations } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardQuotations(session.user.id)
      setQuotations(data)
      setLoading(false)
    }
    load()
  }, [session])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Quotations</h1>
        <p className="text-sm text-muted-foreground">View and manage your quotations</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : quotations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No quotations yet</p>
            <p className="text-sm text-muted-foreground">Quotations will appear here once your requests are reviewed</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {quotations.map((q: any) => (
            <Card key={q.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <p className="font-medium">{q.title}</p>
                  <p className="text-sm text-muted-foreground">{q.quotationNumber}</p>
                  <div className="flex gap-4 mt-1 text-sm">
                    <span className="text-muted-foreground">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: q.currency }).format(q.totalAmount / 100)}</span>
                    <span className="text-muted-foreground">{new Date(q.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge variant="secondary" className={statusColors[q.status]}>{q.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
