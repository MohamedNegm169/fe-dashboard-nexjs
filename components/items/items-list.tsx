"use client"

import { useAppSelector, useAppDispatch } from "../../lib/hooks"
import { setSelectedItem, fetchItems } from "../../lib/features/items/itemsSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { RetryError } from "../ui/retry-error"
import { SearchEmptyState, NoItemsEmptyState } from "../ui/empty-state"
import { Eye, Calendar } from "lucide-react"
import type { Item } from "../../types/item"

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
}

interface ItemsListProps {
  onAddItem?: () => void
  onClearFilters?: () => void
}

export function ItemsList({ onAddItem, onClearFilters }: ItemsListProps) {
  const dispatch = useAppDispatch()
  const { items, loading, error, filters, total } = useAppSelector((state) => state.items)

  const handleViewDetails = (item: Item) => {
    dispatch(setSelectedItem(item))
  }

  const handleRetry = () => {
    dispatch(fetchItems(filters))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const hasActiveFilters = filters.search || (filters.status && filters.status !== "all")

  if (error && !loading) {
    return (
      <div className="py-8">
        <RetryError title="Failed to load items" message={error} onRetry={handleRetry} isRetrying={loading} />
      </div>
    )
  }

  if (loading && items.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    if (hasActiveFilters) {
      return <SearchEmptyState onClearFilters={onClearFilters || (() => {})} />
    }

    if (total === 0) {
      return <NoItemsEmptyState onAddItem={onAddItem || (() => {})} />
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg leading-tight text-balance">{item.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className={statusColors[item.status]}>
                    {item.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">ID: {item.id}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-sm mb-4 line-clamp-2">{item.description}</CardDescription>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(item.createdAt)}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(item)}
                className="flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Eye className="h-3 w-3" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
