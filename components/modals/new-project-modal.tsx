"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, AlertCircle, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { validateForm, PROJECT_SCHEMA } from "@/lib/validation"

interface NewProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (project: any) => void
}

export function NewProjectModal({ open, onOpenChange, onSubmit }: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    budget: "",
    dueDate: undefined as Date | undefined,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time validation
  useEffect(() => {
    const newErrors = validateForm(formData, PROJECT_SCHEMA)
    setErrors(newErrors)
  }, [formData])

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleFormValidation = () => {
    const newErrors = validateForm(formData, PROJECT_SCHEMA)
    setErrors(newErrors)
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!handleFormValidation()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSubmit({
        ...formData,
        budget: Number(formData.budget),
        status: "Planning",
        progress: 0,
        spend: 0,
        teamMembers: [],
        membersCount: 0,
      })

      // Reset form
      setFormData({ name: "", description: "", priority: "", budget: "", dueDate: undefined })
      setErrors({})
      setTouched({})
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldError = (field: string) => {
    return touched[field] && errors[field] ? errors[field] : null
  }

  const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-1 sm:px-0">
          <DialogTitle className="text-lg sm:text-xl">Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 px-1 sm:px-0">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Project Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onBlur={() => handleFieldBlur("name")}
              placeholder="Enter project name"
              className={`h-11 sm:h-10 text-base sm:text-sm ${getFieldError("name") ? "border-destructive" : ""}`}
            />
            {getFieldError("name") && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{getFieldError("name")}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              onBlur={() => handleFieldBlur("description")}
              placeholder="Enter project description"
              rows={3}
              className={`min-h-[88px] sm:min-h-[80px] text-base sm:text-sm resize-none ${getFieldError("description") ? "border-destructive" : ""}`}
            />
            {getFieldError("description") && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{getFieldError("description")}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority *
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleFieldChange("priority", value)}>
                <SelectTrigger
                  className={`h-11 sm:h-10 text-base sm:text-sm ${getFieldError("priority") ? "border-destructive" : ""}`}
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              {getFieldError("priority") && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{getFieldError("priority")}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium">
                Budget ($) *
              </Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => handleFieldChange("budget", e.target.value)}
                onBlur={() => handleFieldBlur("budget")}
                placeholder="0"
                className={`h-11 sm:h-10 text-base sm:text-sm ${getFieldError("budget") ? "border-destructive" : ""}`}
              />
              {getFieldError("budget") && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{getFieldError("budget")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Due Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-11 sm:h-10 text-base sm:text-sm",
                    !formData.dueDate && "text-muted-foreground",
                    getFieldError("dueDate") && "border-destructive",
                  )}
                  onClick={() => handleFieldBlur("dueDate")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dueDate}
                  onSelect={(date) => handleFieldChange("dueDate", date)}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {getFieldError("dueDate") && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{getFieldError("dueDate")}</span>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto h-11 sm:h-10 text-base sm:text-sm order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full sm:w-auto h-11 sm:h-10 text-base sm:text-sm order-1 sm:order-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Create Project
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
