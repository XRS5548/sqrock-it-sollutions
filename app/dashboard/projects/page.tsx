"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, FolderKanban } from "lucide-react"
import { motion } from "framer-motion"

const statusColors: Record<string, string> = {
  planning: "bg-yellow-500/10 text-yellow-500",
  in_progress: "bg-blue-500/10 text-blue-500",
  on_hold: "bg-orange-500/10 text-orange-500",
  completed: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
}

export default function ProjectsPage() {
  const { data: session } = authClient.useSession()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!session?.user?.id) return
      const { getDashboardProjects } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardProjects(session.user.id)
      setProjects(data)
      setLoading(false)
    }
    load()
  }, [session])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">Track your project progress</p>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse"><CardContent className="h-32" /></Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No projects yet</p>
            <p className="text-sm text-muted-foreground">Projects will appear here once created</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <Card className="hover:bg-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <Badge variant="secondary" className={statusColors[project.status]}>{project.status.replace(/_/g, " ")}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{project.progressPercentage ?? 0}% complete</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.progressPercentage ?? 0}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">{project.description?.slice(0, 80)}...</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  )
}
