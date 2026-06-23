"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Bot, Plus, Zap, Trash2 } from "lucide-react"

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", trigger: "project_completed", action: "send_email", actionConfig: "{}" })

  useEffect(() => {
    async function load() {
      const { getAutomations } = await import("@/lib/actions/admin")
      setAutomations(await getAutomations())
      setLoading(false)
    }
    load()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const { createAutomation } = await import("@/lib/actions/admin")
    try {
      const config = JSON.parse(form.actionConfig)
      await createAutomation({
        name: form.name,
        trigger: form.trigger,
        action: form.action,
        actionConfig: config,
        isActive: true,
      })
      setOpen(false)
      setForm({ name: "", trigger: "project_completed", action: "send_email", actionConfig: "{}" })
      const { getAutomations } = await import("@/lib/actions/admin")
      setAutomations(await getAutomations())
    } catch { alert("Invalid JSON in action config") }
  }

  async function toggleActive(id: string, current: boolean) {
    const { toggleAutomation } = await import("@/lib/actions/admin")
    await toggleAutomation(id, !current)
    const { getAutomations } = await import("@/lib/actions/admin")
    setAutomations(await getAutomations())
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-semibold">Automations</h1><p className="text-sm text-muted-foreground">Trigger-based automation rules</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> New Rule</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Automation Rule</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Trigger</Label><Select value={form.trigger} onValueChange={(v) => setForm({ ...form, trigger: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                {["project_completed", "milestone_completed", "request_approved", "invoice_paid", "ticket_resolved", "lead_status_changed"].map((t) => (
                  <SelectItem key={t} value={t} className="capitalize">{t.replace(/_/g, " ")}</SelectItem>
                ))}
              </SelectContent></Select></div>
              <div className="space-y-2"><Label>Action</Label><Select value={form.action} onValueChange={(v) => setForm({ ...form, action: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                {["send_email", "create_notification", "update_status", "request_review", "create_task", "webhook"].map((a) => (
                  <SelectItem key={a} value={a} className="capitalize">{a.replace(/_/g, " ")}</SelectItem>
                ))}
              </SelectContent></Select></div>
              <div className="space-y-2"><Label>Action Config (JSON)</Label><Textarea value={form.actionConfig} onChange={(e) => setForm({ ...form, actionConfig: e.target.value })} rows={4} /></div>
              <Button type="submit">Create Rule</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : automations.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><Bot className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No automation rules</p><p className="text-sm text-muted-foreground">Create rules to automate your workflow</p></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {automations.map((a: any) => (
            <Card key={a.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Zap className={`h-4 w-4 ${a.isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{a.trigger.replace(/_/g, " ")} → {a.action.replace(/_/g, " ")}</p>
                  </div>
                </div>
                <Switch checked={a.isActive} onCheckedChange={() => toggleActive(a.id, a.isActive)} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
