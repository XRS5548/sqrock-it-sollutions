"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Plus, GripVertical, X, Eye, Settings, List, AlignLeft, CheckSquare, Circle, Calendar, Upload, Sliders, Clock, ChevronDown, ChevronRight } from "lucide-react"

const fieldTypes = [
  { value: "text", label: "Text", icon: List },
  { value: "textarea", label: "Textarea", icon: AlignLeft },
  { value: "select", label: "Select", icon: ChevronDown },
  { value: "multiselect", label: "Multi Select", icon: ChevronDown },
  { value: "checkbox", label: "Checkbox", icon: CheckSquare },
  { value: "radio", label: "Radio", icon: Circle },
  { value: "date", label: "Date", icon: Calendar },
  { value: "file", label: "File Upload", icon: Upload },
  { value: "budget_slider", label: "Budget Slider", icon: Sliders },
  { value: "timeline", label: "Timeline", icon: Clock },
  { value: "heading", label: "Heading", icon: List },
  { value: "paragraph", label: "Paragraph", icon: AlignLeft },
]

export default function FormBuilderPage() {
  const [templates, setTemplates] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [fields, setFields] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [templateName, setTemplateName] = useState("")

  useEffect(() => {
    async function load() {
      const { adminGetServices, adminGetFormTemplates } = await import("@/lib/actions/admin")
      const svcData = await adminGetServices()
      setServices(svcData.services)
      setTemplates(await adminGetFormTemplates())
      setLoading(false)
    }
    load()
  }, [])

  async function createTemplate() {
    if (!templateName.trim()) return
    const { createFormTemplate } = await import("@/lib/actions/services")
    const { adminGetServices } = await import("@/lib/actions/admin")
    const servicesData = await adminGetServices()
    const template = await createFormTemplate({ name: templateName, serviceId: servicesData.services[0]?.id || "", isActive: true } as any)
    setTemplates([...templates, template])
    setSelectedTemplate(template)
    setFields([])
    setTemplateName("")
  }

  async function selectTemplate(template: any) {
    setSelectedTemplate(template)
      const { adminGetFormFields } = await import("@/lib/actions/admin")
      const fieldsData = await adminGetFormFields(template.id)
    setFields(fieldsData)
  }

  async function addField(type: string) {
    if (!selectedTemplate) return
    const { createFormField } = await import("@/lib/actions/services")
    const field = await createFormField({
      templateId: selectedTemplate.id,
      label: `New ${type} field`,
      fieldType: type,
      required: false,
      displayOrder: fields.length,
    } as any)
    setFields([...fields, field])
  }

  async function updateField(id: string, data: any) {
    const { updateFormField } = await import("@/lib/actions/services")
    await updateFormField(id, data)
    setFields(fields.map((f) => f.id === id ? { ...f, ...data } : f))
  }

  async function removeField(id: string) {
    const { deleteFormField } = await import("@/lib/actions/services")
    await deleteFormField(id)
    setFields(fields.filter((f) => f.id !== id))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-2xl font-semibold">Dynamic Form Builder</h1><p className="text-sm text-muted-foreground">Create custom service request forms without coding</p></div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Template sidebar */}
        <Card className="h-fit">
          <CardHeader><CardTitle className="text-base">Templates</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input value={templateName} onChange={(e) => setTemplateName(e.target.value)} placeholder="New template name" />
              <Button size="sm" onClick={createTemplate}><Plus className="h-3 w-3" /></Button>
            </div>
            <div className="space-y-1">
              {templates.map((t) => (
                <div
                  key={t.id}
                  className={`p-2 rounded-lg text-sm cursor-pointer transition-colors ${selectedTemplate?.id === t.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                  onClick={() => selectTemplate(t)}
                >
                  {t.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form builder area */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{selectedTemplate ? selectedTemplate.name : "Select a template"}</CardTitle>
              {selectedTemplate && (
                <div className="flex flex-wrap gap-2">
                  {fieldTypes.map((ft) => (
                    <Button key={ft.value} variant="outline" size="sm" onClick={() => addField(ft.value)} className="text-xs h-7">
                      <ft.icon className="h-3 w-3 mr-1" />{ft.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selectedTemplate ? (
              <div className="text-center py-12 text-muted-foreground">Select or create a template to start building your form</div>
            ) : fields.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">Add fields to your form using the buttons above</div>
            ) : (
              <div className="space-y-3">
                {fields.map((field, i) => (
                  <Card key={field.id} className="relative group">
                    <CardContent className="py-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            className="font-medium border-0 p-0 h-auto focus-visible:ring-0"
                          />
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary">{fieldTypes.find((ft) => ft.value === field.fieldType)?.label || field.fieldType}</Badge>
                            <label className="flex items-center gap-1">
                              <Switch checked={field.required} onCheckedChange={(v) => updateField(field.id, { required: v })} />
                              Required
                            </label>
                          </div>
                          {(field.fieldType === "select" || field.fieldType === "multiselect" || field.fieldType === "radio" || field.fieldType === "checkbox") && (
                            <OptionsEditor fieldId={field.id} />
                          )}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeField(field.id)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

function OptionsEditor({ fieldId }: { fieldId: string }) {
  const [options, setOptions] = useState<any[]>([])
  const [newLabel, setNewLabel] = useState("")

  useEffect(() => {
    async function load() {
      const { adminGetFormOptions } = await import("@/lib/actions/admin")
      setOptions(await adminGetFormOptions(fieldId))
    }
    load()
  }, [fieldId])

  async function addOption() {
    if (!newLabel.trim()) return
    const { createFormOption } = await import("@/lib/actions/services")
    const opt = await createFormOption({
      fieldId,
      label: newLabel,
      value: newLabel.toLowerCase().replace(/\s+/g, "_"),
      displayOrder: options.length,
    } as any)
    setOptions([...options, opt])
    setNewLabel("")
  }

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-medium text-muted-foreground">Options</p>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <Badge key={opt.id} variant="secondary" className="text-xs">{opt.label}</Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Add option" className="h-7 text-xs" />
        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={addOption}>Add</Button>
      </div>
    </div>
  )
}
