"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FolderKanban, FileText, DollarSign, Receipt, TicketCheck } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    clients: 0, projects: 0, requests: 0,
    quotations: 0, invoices: 0, tickets: 0,
  })

  useEffect(() => {
    async function load() {
      const { getStats } = await import("@/lib/actions/admin")
      setStats(await getStats())
    }
    load()
  }, [])

  const items = [
    { label: "Total Clients", value: stats.clients, icon: Users },
    { label: "Projects", value: stats.projects, icon: FolderKanban },
    { label: "Requests", value: stats.requests, icon: FileText },
    { label: "Quotations", value: stats.quotations, icon: DollarSign },
    { label: "Invoices", value: stats.invoices, icon: Receipt },
    { label: "Tickets", value: stats.tickets, icon: TicketCheck },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your agency</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <Card key={item.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{item.value}</div></CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
