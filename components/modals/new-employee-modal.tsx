"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { validateForm, EMPLOYEE_SCHEMA } from "@/lib/validation"
import { AlertCircle, Check } from "lucide-react"

interface NewEmployeeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (employee: any) => void
}

export function NewEmployeeModal({ open, onOpenChange, onSubmit }: NewEmployeeModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    salary: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time validation
  useEffect(() => {
    const newErrors = validateForm(formData, EMPLOYEE_SCHEMA)
    setErrors(newErrors)
  }, [formData])

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleFormValidation = () => {
    const newErrors = validateForm(formData, EMPLOYEE_SCHEMA)
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
        salary: Number(formData.salary),
        status: "Active",
        joinDate: new Date().toISOString().split("T")[0],
        id: `EMP${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
        avatar: "/placeholder.svg",
      })

      // Reset form
      setFormData({ name: "", email: "", phone: "", role: "", department: "", salary: "" })
      setErrors({})
      setTouched({})
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating employee:", error)
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
          <DialogTitle className="text-lg sm:text-xl">Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 px-1 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                onBlur={() => handleFieldBlur("name")}
                placeholder="John Doe"
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
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                onBlur={() => handleFieldBlur("email")}
                placeholder="john@company.com"
                className={`h-11 sm:h-10 text-base sm:text-sm ${getFieldError("email") ? "border-destructive" : ""}`}
              />
              {getFieldError("email") && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{getFieldError("email")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                onBlur={() => handleFieldBlur("phone")}
                placeholder="+1 (555) 123-4567"
                className={`h-11 sm:h-10 text-base sm:text-sm ${getFieldError("phone") ? "border-destructive" : ""}`}
              />
              {getFieldError("phone") && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{getFieldError("phone")}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="text-sm font-medium">
                Salary ($) *
              </Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => handleFieldChange("salary", e.target.value)}
                onBlur={() => handleFieldBlur("salary")}
                placeholder="75000"
                className={`h-11 sm:h-10 text-base sm:text-sm ${getFieldError("salary") ? "border-destructive" : ""}`}
              />
              {getFieldError("salary") && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{getFieldError("salary")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Job Title *
            </Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleFieldChange("role", e.target.value)}
              onBlur={() => handleFieldBlur("role")}
              placeholder="Software Engineer"
              className={`h-11 sm:h-10 text-base sm:text-sm ${getFieldError("role") ? "border-destructive" : ""}`}
            />
            {getFieldError("role") && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{getFieldError("role")}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium">
              Department *
            </Label>
            <Select value={formData.department} onValueChange={(value) => handleFieldChange("department", value)}>
              <SelectTrigger
                className={`h-11 sm:h-10 text-base sm:text-sm ${getFieldError("department") ? "border-destructive" : ""}`}
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="HR">Human Resources</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
            {getFieldError("department") && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{getFieldError("department")}</span>
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
                  Adding...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Add Employee
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
