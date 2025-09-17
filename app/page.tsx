"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import { fetchItems, setFilters } from "../lib/features/items/itemsSlice"
import { ItemsList } from "../components/items/items-list"
import { ItemsPagination } from "../components/items/items-pagination"
import { SearchAndFilter } from "../components/items/search-and-filter"
import { AddItemForm } from "../components/items/add-item-form"
import { ItemDetailsModal } from "../components/items/item-details-modal"
import { LoadingSpinner } from "../components/ui/loading-spinner"
import { RetryError } from "../components/ui/retry-error"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { items, loading, error, filters, total } = useAppSelector((state) => state.items)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    dispatch(fetchItems(filters))
  }, [dispatch, filters])

  const handleRetry = () => {
    dispatch(fetchItems(filters))
  }

  const handleClearFilters = () => {
    const newFilters = {
      search: "",
      status: "all" as const,
      page: 1,
      limit: filters.limit,
    }
    dispatch(setFilters(newFilters))
    dispatch(fetchItems(newFilters))
  }

  if (loading && items.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" className="mb-4" />
            <h2 className="text-lg font-semibold mb-2">Loading Dashboard</h2>
            <p className="text-muted-foreground">Please wait while we fetch your items...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error && items.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <RetryError title="Failed to load dashboard" message={error} onRetry={handleRetry} isRetrying={loading} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your items with search, filter, and pagination</p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <SearchAndFilter />
        </div>

        {/* Items List */}
        <div className="mb-8">
          <ItemsList onAddItem={() => setShowAddForm(true)} onClearFilters={handleClearFilters} />
        </div>

        {/* Pagination */}
        {total > 0 && (
          <div className="flex justify-center">
            <ItemsPagination />
          </div>
        )}

        {/* Add Item Modal */}
        {showAddForm && <AddItemForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} />}

        {/* Item Details Modal */}
        <ItemDetailsModal />
      </div>
    </div>
  )
}
