"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Receipt } from "lucide-react"
import { motion } from "framer-motion"

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-500",
  sent: "bg-blue-500/10 text-blue-500",
  partially_paid: "bg-yellow-500/10 text-yellow-500",
  paid: "bg-green-500/10 text-green-500",
  overdue: "bg-red-500/10 text-red-500",
  cancelled: "bg-red-500/10 text-red-500",
}

export default function InvoicesPage() {
  const { data: session } = authClient.useSession()
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) return
      const { getDashboardInvoices } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardInvoices(session.user.id)
      setInvoices(data)
      setLoading(false)
    }
    load()
  }, [session])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <p className="text-sm text-muted-foreground">View your invoices and payment status</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No invoices yet</p>
            <p className="text-sm text-muted-foreground">Invoices will appear here once generated</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {invoices.map((inv: any) => (
            <Card key={inv.id} className="hover:bg-accent/50 transition-colors">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <p className="font-medium">Invoice #{inv.invoiceNumber}</p>
                  <div className="flex gap-4 mt-1 text-sm">
                    <span className="text-muted-foreground">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: inv.currency }).format(inv.totalAmount / 100)}</span>
                    <span className="text-muted-foreground">Due: {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "N/A"}</span>
                  </div>
                </div>
                <Badge variant="secondary" className={statusColors[inv.status]}>{inv.status.replace(/_/g, " ")}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
