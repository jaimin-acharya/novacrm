export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

export interface ValidationSchema {
  [key: string]: ValidationRule
}

export function validateField(value: any, rules: ValidationRule): string | null {
  if (rules.required && (!value || (typeof value === "string" && !value.trim()))) {
    return "This field is required"
  }

  if (!value) return null // Skip other validations if field is empty and not required

  if (typeof value === "string") {
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return "Invalid format"
    }
  }

  if (rules.custom) {
    return rules.custom(value)
  }

  return null
}

export function validateForm(data: Record<string, any>, schema: ValidationSchema): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(data[field], rules)
    if (error) {
      errors[field] = error
    }
  }

  return errors
}

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/.+\..+/,
  zipCode: /^\d{5}(-\d{4})?$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

// Common validation schemas
export const EMPLOYEE_SCHEMA: ValidationSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    custom: (value) => {
      if (value && !/^[a-zA-Z\s]+$/.test(value)) {
        return "Name can only contain letters and spaces"
      }
      return null
    },
  },
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.email,
    custom: (value) => {
      if (value && !VALIDATION_PATTERNS.email.test(value)) {
        return "Please enter a valid email address"
      }
      return null
    },
  },
  phone: {
    required: true,
    custom: (value) => {
      if (value && !VALIDATION_PATTERNS.phone.test(value.replace(/[\s\-$$$$]/g, ""))) {
        return "Please enter a valid phone number"
      }
      return null
    },
  },
  role: { required: true, minLength: 2, maxLength: 100 },
  department: { required: true },
  salary: {
    required: true,
    custom: (value) => {
      const num = Number(value)
      if (isNaN(num) || num < 0) {
        return "Please enter a valid salary amount"
      }
      if (num < 20000) {
        return "Salary must be at least $20,000"
      }
      if (num > 1000000) {
        return "Salary cannot exceed $1,000,000"
      }
      return null
    },
  },
}

export const PROJECT_SCHEMA: ValidationSchema = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 100,
    custom: (value) => {
      if (value && value.trim().length < 3) {
        return "Project name must be at least 3 characters"
      }
      return null
    },
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 500,
    custom: (value) => {
      if (value && value.trim().length < 10) {
        return "Description must be at least 10 characters"
      }
      return null
    },
  },
  priority: { required: true },
  budget: {
    required: true,
    custom: (value) => {
      const num = Number(value)
      if (isNaN(num) || num < 0) {
        return "Please enter a valid budget amount"
      }
      if (num < 100) {
        return "Budget must be at least $100"
      }
      if (num > 10000000) {
        return "Budget cannot exceed $10,000,000"
      }
      return null
    },
  },
  dueDate: {
    required: true,
    custom: (value) => {
      if (!value) return "Due date is required"
      const date = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (date < today) {
        return "Due date cannot be in the past"
      }
      return null
    },
  },
}

export const PROFILE_SCHEMA: ValidationSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    custom: (value) => {
      if (value && !/^[a-zA-Z\s]+$/.test(value)) {
        return "Name can only contain letters and spaces"
      }
      return null
    },
  },
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.email,
    custom: (value) => {
      if (value && !VALIDATION_PATTERNS.email.test(value)) {
        return "Please enter a valid email address"
      }
      return null
    },
  },
  phone: {
    custom: (value) => {
      if (value && !VALIDATION_PATTERNS.phone.test(value.replace(/[\s\-$$$$]/g, ""))) {
        return "Please enter a valid phone number"
      }
      return null
    },
  },
  bio: { maxLength: 500 },
}

export const COMPANY_SCHEMA: ValidationSchema = {
  name: { required: true, minLength: 2, maxLength: 100 },
  address: { maxLength: 200 },
  city: { maxLength: 50 },
  state: { maxLength: 50 },
  zip: {
    custom: (value) => {
      if (value && !VALIDATION_PATTERNS.zipCode.test(value)) {
        return "Please enter a valid ZIP code"
      }
      return null
    },
  },
  website: {
    custom: (value) => {
      if (value && !VALIDATION_PATTERNS.url.test(value)) {
        return "Please enter a valid website URL"
      }
      return null
    },
  },
}
