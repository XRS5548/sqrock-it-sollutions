"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewRequestPage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [services, setServices] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      const { getDashboardServices } = await import("@/lib/actions/dashboard-data")
      const data = await getDashboardServices()
      setServices(data)
    }
    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!session?.user?.id) return
    setSubmitting(true)
    const { createRequest } = await import("@/lib/actions/services")
    const request = await createRequest({
      userId: session.user.id,
      serviceId,
      title,
      description,
      status: "draft",
    })
    router.push(`/dashboard/requests`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/requests"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div>
          <h1 className="text-2xl font-semibold">New Service Request</h1>
          <p className="text-sm text-muted-foreground">Tell us what you need</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Service</Label>
          <Select value={serviceId} onValueChange={setServiceId} required>
            <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
            <SelectContent>
              {services.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief title for your request" required />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what you need in detail" rows={5} />
        </div>
        <Button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create Request"}</Button>
      </form>
    </motion.div>
  )
}
