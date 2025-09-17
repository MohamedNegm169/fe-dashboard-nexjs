"use client"

import { useAppSelector, useAppDispatch } from "../../lib/hooks"
import { setSelectedItem } from "../../lib/features/items/itemsSlice"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Calendar, Clock, Hash, FileText, Tag, X } from "lucide-react"

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
}

const statusDescriptions = {
  active: "This item is currently active and being worked on",
  inactive: "This item is not currently active",
  pending: "This item is waiting for approval or further action",
}

export function ItemDetailsModal() {
  const dispatch = useAppDispatch()
  const { selectedItem } = useAppSelector((state) => state.items)

  const handleClose = () => {
    dispatch(setSelectedItem(null))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDateRelative = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Today"
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7)
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`
    } else {
      const months = Math.floor(diffInDays / 30)
      return `${months} month${months > 1 ? "s" : ""} ago`
    }
  }

  if (!selectedItem) {
    return null
  }

  return (
    <Dialog open={!!selectedItem} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl font-bold text-balance leading-tight pr-8">
              {selectedItem.title}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0 shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Status and ID */}
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className={statusColors[selectedItem.status]}>
              <Tag className="h-3 w-3 mr-1" />
              {selectedItem.status}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Hash className="h-3 w-3" />
              ID: {selectedItem.id}
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Description</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed pl-6">{selectedItem.description}</p>
        </div>

        <Separator />

        {/* Status Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Status Information</h3>
          </div>
          <div className="pl-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Current Status:</span>
              <Badge variant="secondary" className={statusColors[selectedItem.status]}>
                {selectedItem.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{statusDescriptions[selectedItem.status]}</p>
          </div>
        </div>

        <Separator />

        {/* Timestamps */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Timeline</h3>
          </div>

          <div className="pl-6 space-y-4">
            {/* Created */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium">Created:</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:ml-auto">
                <span className="text-sm text-muted-foreground">{formatDateRelative(selectedItem.createdAt)}</span>
                <span className="text-xs text-muted-foreground">{formatDate(selectedItem.createdAt)}</span>
              </div>
            </div>

            {/* Updated */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium">Last Updated:</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:ml-auto">
                <span className="text-sm text-muted-foreground">{formatDateRelative(selectedItem.updatedAt)}</span>
                <span className="text-xs text-muted-foreground">{formatDate(selectedItem.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button>Edit Item</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
