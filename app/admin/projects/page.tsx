"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { FolderKanban } from "lucide-react"

const statusColors: Record<string, string> = {
  planning: "bg-yellow-500/10 text-yellow-500", in_progress: "bg-blue-500/10 text-blue-500",
  on_hold: "bg-orange-500/10 text-orange-500", completed: "bg-green-500/10 text-green-500", cancelled: "bg-red-500/10 text-red-500",
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { adminGetAllProjects } = await import("@/lib/actions/admin")
      setProjects(await adminGetAllProjects())
      setLoading(false)
    }
    load()
  }, [])

  async function handleStatusChange(id: string, status: string) {
    const { updateProject } = await import("@/lib/actions/projects")
    await updateProject(id, { status: status as any })
    const { adminGetAllProjects } = await import("@/lib/actions/admin")
    setProjects(await adminGetAllProjects())
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-2xl font-semibold">All Projects</h1><p className="text-sm text-muted-foreground">Manage client projects</p></div>
      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="h-16" /></Card>)}</div>
      ) : projects.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><FolderKanban className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No projects</p></CardContent></Card>
      ) : (
        <div className="space-y-2">
          {projects.map((p: any) => (
            <Card key={p.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.progressPercentage}% complete</p>
                </div>
                <Select defaultValue={p.status} onValueChange={(v) => handleStatusChange(p.id, v)}>
                  <SelectTrigger className="w-36 h-7 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["planning", "in_progress", "on_hold", "completed", "cancelled"].map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s.replace(/_/g, " ")}</SelectItem>
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
