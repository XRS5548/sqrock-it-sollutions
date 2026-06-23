"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Circle, Clock, ListTodo } from "lucide-react"
import Link from "next/link"

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id!
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { getDashboardProject } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardProject(id)
      setProject(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <div className="space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-32" /><Skeleton className="h-64" /></div>
  if (!project) return <div className="text-center py-12">Project not found</div>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div>
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <Badge variant="secondary" className="ml-auto">{project.status.replace(/_/g, " ")}</Badge>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Progress</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{project.progressPercentage}%</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Tasks</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{project.tasks?.length ?? 0}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Milestones</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{project.milestones?.length ?? 0}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Deliverables</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{project.deliverables?.length ?? 0}</div></CardContent></Card>
      </div>

      <Progress value={project.progressPercentage} className="h-2" />

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-3">
          {project.tasks?.length === 0 ? (
            <Card><CardContent className="text-center py-8 text-muted-foreground">No tasks yet</CardContent></Card>
          ) : project.tasks?.map((task: any) => (
            <Card key={task.id}>
              <CardContent className="flex items-center gap-3 py-3">
                {task.status === "done" ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : task.status === "in_progress" ? <Clock className="h-4 w-4 text-blue-500" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                <div className="flex-1">
                  <p className={task.status === "done" ? "line-through text-muted-foreground" : ""}>{task.title}</p>
                  {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
                </div>
                <Badge variant="secondary">{task.status.replace(/_/g, " ")}</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="milestones" className="space-y-3">
          {project.milestones?.map((ms: any) => (
            <Card key={ms.id}>
              <CardContent className="py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{ms.title}</span>
                  <Badge variant="secondary">{ms.status.replace(/_/g, " ")}</Badge>
                </div>
                <Progress value={ms.progressPercentage} className="h-1.5" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="deliverables" className="space-y-3">
          {project.deliverables?.map((d: any) => (
            <Card key={d.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.description}</p>
                </div>
                <Badge variant="secondary">{d.status.replace(/_/g, " ")}</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="space-y-3">
          {project.activityLogs?.map((log: any) => (
            <div key={log.id} className="flex items-start gap-3 text-sm border-l-2 border-primary/30 pl-4">
              <div className="h-2 w-2 mt-1.5 rounded-full bg-primary" />
              <div>
                <p>{log.description}</p>
                <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
