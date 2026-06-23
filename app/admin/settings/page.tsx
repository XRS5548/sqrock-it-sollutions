"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Settings } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-semibold">Admin Settings</h1><p className="text-sm text-muted-foreground">Configure your agency settings</p></div>
      <Card>
        <CardHeader><CardTitle>General</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Agency Name</Label><p className="text-sm text-muted-foreground">SQROCK IT Solutions</p></div>
          <div className="space-y-2"><Label>Default Currency</Label><p className="text-sm text-muted-foreground">INR (₹)</p></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Email notifications are configured via SMTP environment variables.</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
