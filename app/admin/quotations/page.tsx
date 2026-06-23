"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { adminGetAllQuotations } = await import("@/lib/actions/admin")
      setQuotations(await adminGetAllQuotations())
      setLoading(false)
    }
    load()
  }, [])

  async function handleStatusChange(id: string, status: string) {
    const { updateQuotation } = await import("@/lib/actions/billing")
    await updateQuotation(id, { status: status as any })
    const { adminGetAllQuotations } = await import("@/lib/actions/admin")
    setQuotations(await adminGetAllQuotations())
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-2xl font-semibold">Quotations</h1><p className="text-sm text-muted-foreground">Manage client quotations</p></div>
      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : quotations.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><DollarSign className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No quotations</p></CardContent></Card>
      ) : (
        <div className="space-y-2">
          {quotations.map((q: any) => (
            <Card key={q.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-medium">{q.quotationNumber} - {q.title}</p>
                  <p className="text-xs text-muted-foreground">₹{(q.totalAmount / 100).toLocaleString()}</p>
                </div>
                <Select defaultValue={q.status} onValueChange={(v) => handleStatusChange(q.id, v)}>
                  <SelectTrigger className="w-32 h-7 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["draft", "sent", "viewed", "accepted", "rejected", "expired"].map((s) => (
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
