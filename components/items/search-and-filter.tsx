"use client"

import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../lib/hooks"
import { setFilters, fetchItems } from "../../lib/features/items/itemsSlice"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Search, X, Filter } from "lucide-react"
import { useDebounce } from "../../hooks/use-debounce"

export function SearchAndFilter() {
  const dispatch = useAppDispatch()
  const { filters, loading } = useAppSelector((state) => state.items)

  const [searchValue, setSearchValue] = useState(filters.search || "")
  const [statusValue, setStatusValue] = useState(filters.status || "all")

  // Debounce search input to avoid too many API calls
  const debouncedSearchValue = useDebounce(searchValue, 300)

  // Update filters when debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue !== filters.search) {
      const newFilters = {
        ...filters,
        search: debouncedSearchValue,
        page: 1, // Reset to first page when searching
      }
      dispatch(setFilters(newFilters))
      dispatch(fetchItems(newFilters))
    }
  }, [debouncedSearchValue, filters, dispatch])

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusValue(value)
    const newFilters = {
      ...filters,
      status: value as any,
      page: 1, // Reset to first page when filtering
    }
    dispatch(setFilters(newFilters))
    dispatch(fetchItems(newFilters))
  }

  // Clear search
  const clearSearch = () => {
    setSearchValue("")
    const newFilters = {
      ...filters,
      search: "",
      page: 1,
    }
    dispatch(setFilters(newFilters))
    dispatch(fetchItems(newFilters))
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchValue("")
    setStatusValue("all")
    const newFilters = {
      search: "",
      status: "all" as any,
      page: 1,
      limit: filters.limit,
    }
    dispatch(setFilters(newFilters))
    dispatch(fetchItems(newFilters))
  }

  const hasActiveFilters = searchValue || statusValue !== "all"

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search items by title or description..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-10"
            disabled={loading}
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusValue} onValueChange={handleStatusChange} disabled={loading}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearAllFilters}
            disabled={loading}
            className="flex items-center gap-2 bg-transparent"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {searchValue && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <Search className="h-3 w-3" />
              <span>"{searchValue}"</span>
              <Button variant="ghost" size="sm" onClick={clearSearch} className="h-4 w-4 p-0 hover:bg-primary/20">
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {statusValue !== "all" && (
            <div className="flex items-center gap-1 bg-secondary/80 text-secondary-foreground px-2 py-1 rounded-md text-sm">
              <Filter className="h-3 w-3" />
              <span className="capitalize">{statusValue}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStatusChange("all")}
                className="h-4 w-4 p-0 hover:bg-secondary"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
