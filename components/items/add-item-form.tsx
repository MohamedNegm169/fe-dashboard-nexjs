"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import { createItem, clearError } from "../../lib/features/items/itemsSlice"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { LoadingSpinner } from "../ui/loading-spinner"
import { ErrorMessage } from "../ui/error-message"
import { useToast } from "../../hooks/use-toast"
import { Plus, X } from "lucide-react"
import type { CreateItemRequest } from "../../types/item"

interface AddItemFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  title: string
  description: string
  status: "active" | "inactive" | "pending" | ""
}

interface FormErrors {
  title?: string
  description?: string
  status?: string
}

export function AddItemForm({ isOpen, onClose }: AddItemFormProps) {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.items)
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Validation rules
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Title is required"
        if (value.trim().length < 3) return "Title must be at least 3 characters"
        if (value.trim().length > 100) return "Title must be less than 100 characters"
        break
      case "description":
        if (!value.trim()) return "Description is required"
        if (value.trim().length < 10) return "Description must be at least 10 characters"
        if (value.trim().length > 500) return "Description must be less than 500 characters"
        break
      case "status":
        if (!value) return "Status is required"
        break
    }
    return undefined
  }

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  // Handle input changes
  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Validate field on change if it was touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  // Handle field blur
  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name])
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      title: true,
      description: true,
      status: true,
    })

    if (!validateForm()) {
      return
    }

    try {
      const itemData: CreateItemRequest = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status as "active" | "inactive" | "pending",
      }

      await dispatch(createItem(itemData)).unwrap()

      toast({
        title: "Item created successfully!",
        description: `"${itemData.title}" has been added to your dashboard.`,
        variant: "success",
      })

      // Reset form and close modal on success
      setFormData({ title: "", description: "", status: "" })
      setErrors({})
      setTouched({})
      onClose()
    } catch (error) {
      toast({
        title: "Failed to create item",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
      console.error("Failed to create item:", error)
    }
  }

  // Handle modal close
  const handleClose = () => {
    if (!loading) {
      setFormData({ title: "", description: "", status: "" })
      setErrors({})
      setTouched({})
      dispatch(clearError())
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              <DialogTitle>Add New Item</DialogTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose} disabled={loading} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Create a new item by filling out the form below. All fields are required.
          </DialogDescription>
        </DialogHeader>

        {/* Error Message */}
        {error && <ErrorMessage message={error} onDismiss={() => dispatch(clearError())} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter item title..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              onBlur={() => handleBlur("title")}
              disabled={loading}
              className={errors.title ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter item description..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              disabled={loading}
              rows={4}
              className={errors.description ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            <p className="text-xs text-muted-foreground">{formData.description.length}/500 characters</p>
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
              disabled={loading}
            >
              <SelectTrigger className={errors.status ? "border-destructive focus-visible:ring-destructive" : ""}>
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Item
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
