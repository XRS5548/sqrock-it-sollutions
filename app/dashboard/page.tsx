"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FolderKanban, FileText, DollarSign, Receipt, TicketCheck } from "lucide-react"
import { motion } from "framer-motion"

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function DashboardHome() {
  const { data: session } = authClient.useSession()

  const stats = [
    { label: "Active Projects", value: "3", icon: FolderKanban, href: "/dashboard/projects" },
    { label: "Open Requests", value: "2", icon: FileText, href: "/dashboard/requests" },
    { label: "Pending Quotations", value: "1", icon: DollarSign, href: "/dashboard/quotations" },
    { label: "Invoices", value: "5", icon: Receipt, href: "/dashboard/invoices" },
    { label: "Support Tickets", value: "1", icon: TicketCheck, href: "/dashboard/tickets" },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome{session?.user?.name ? `, ${session.user.name}` : ""}</h1>
        <p className="text-sm text-muted-foreground">Here is what's happening with your projects</p>
      </div>

      <motion.div variants={item} className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">Project milestone completed</p>
                    <p className="text-muted-foreground">{i} day{i > 1 ? "s" : ""} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <div className="rounded-lg border px-3 py-2 text-sm hover:bg-accent cursor-pointer">New Request</div>
              <div className="rounded-lg border px-3 py-2 text-sm hover:bg-accent cursor-pointer">View Projects</div>
              <div className="rounded-lg border px-3 py-2 text-sm hover:bg-accent cursor-pointer">Open Ticket</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
