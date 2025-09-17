"use client"

import type React from "react"

import { Button } from "./button"
import { Plus, Search } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4 text-muted-foreground">{icon || <div className="text-6xl">📋</div>}</div>
      <h3 className="text-lg font-semibold mb-2 text-balance">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md text-balance">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function SearchEmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <EmptyState
      icon={<Search className="h-16 w-16 text-muted-foreground/50" />}
      title="No items found"
      description="We couldn't find any items matching your search criteria. Try adjusting your filters or search terms."
      action={{
        label: "Clear Filters",
        onClick: onClearFilters,
      }}
    />
  )
}

export function NoItemsEmptyState({ onAddItem }: { onAddItem: () => void }) {
  return (
    <EmptyState
      icon={<div className="text-6xl">🚀</div>}
      title="Welcome to your Dashboard"
      description="Get started by creating your first item. You can add tasks, projects, or any items you need to manage."
      action={{
        label: "Create First Item",
        onClick: onAddItem,
      }}
    />
  )
}
