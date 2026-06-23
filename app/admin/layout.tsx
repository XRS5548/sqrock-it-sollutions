"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { authClient, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard, Users, FileText, DollarSign, Receipt,
  TicketCheck, Settings, LogOut, Menu, X, Bell, Home,
  FolderKanban, CircuitBoard, Bot, Megaphone, Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "CRM", href: "/admin/crm", icon: Users },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Form Builder", href: "/admin/form-builder", icon: CircuitBoard },
  { label: "Requests", href: "/admin/requests", icon: FileText },
  { label: "Quotations", href: "/admin/quotations", icon: DollarSign },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Invoices", href: "/admin/invoices", icon: Receipt },
  { label: "Tickets", href: "/admin/tickets", icon: TicketCheck },
  { label: "Automations", href: "/admin/automations", icon: Bot },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card lg:static lg:z-auto",
          "transform transition-transform duration-200 ease-in-out lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">A</div>
            Admin Panel
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1 h-[calc(100vh-3.5rem)]">
          <nav className="space-y-1 p-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="border-t mx-2 my-2" />
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground mx-2"
          >
            <Home className="h-4 w-4" />
            Client Dashboard
          </Link>
        </ScrollArea>
      </motion.aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b bg-card px-4 gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>{session?.user?.name?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
