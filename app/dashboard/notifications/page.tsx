"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCheck, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export default function NotificationsPage() {
  const { data: session } = authClient.useSession()
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) return
      const { getDashboardNotifications } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardNotifications(session.user.id)
      setNotifications(data)
      setLoading(false)
    }
    load()
  }, [session])

  async function handleMarkAllRead() {
    if (!session?.user?.id) return
    const { markAllNotificationsRead } = await import("@/lib/actions/notifications")
    await markAllNotificationsRead(session.user.id)
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  async function handleDelete(id: string) {
    const { deleteNotification } = await import("@/lib/actions/notifications")
    await deleteNotification(id)
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay updated with your activity</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
          <CheckCheck className="h-4 w-4 mr-2" /> Mark all read
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3, 4, 5].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm text-muted-foreground">You&apos;re all caught up</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((n: any) => (
            <Card key={n.id} className={n.isRead ? "" : "border-primary/30 bg-accent/30"}>
              <CardContent className="flex items-start justify-between py-3">
                <div className="flex items-start gap-3 flex-1">
                  {!n.isRead && <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />}
                  <div className={n.isRead ? "ml-5" : ""}>
                    <p className="text-sm font-medium">{n.title}</p>
                    {n.message && <p className="text-sm text-muted-foreground">{n.message}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleDelete(n.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
