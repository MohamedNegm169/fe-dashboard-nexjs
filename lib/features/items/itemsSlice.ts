import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Item, ItemsResponse, CreateItemRequest, ItemsFilters } from "../../../types/item"

interface ItemsState {
  items: Item[]
  total: number
  page: number
  limit: number
  totalPages: number
  loading: boolean
  error: string | null
  filters: ItemsFilters
  selectedItem: Item | null
}

const initialState: ItemsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "all",
    page: 1,
    limit: 10,
  },
  selectedItem: null,
}

// Async thunks
export const fetchItems = createAsyncThunk("items/fetchItems", async (filters: ItemsFilters) => {
  const params = new URLSearchParams()
  if (filters.search) params.append("search", filters.search)
  if (filters.status && filters.status !== "all") params.append("status", filters.status)
  if (filters.page) params.append("page", filters.page.toString())
  if (filters.limit) params.append("limit", filters.limit.toString())

  const response = await fetch(`/api/items?${params.toString()}`)
  if (!response.ok) {
    throw new Error("Failed to fetch items")
  }
  return response.json() as Promise<ItemsResponse>
})

export const createItem = createAsyncThunk("items/createItem", async (itemData: CreateItemRequest) => {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  })
  if (!response.ok) {
    throw new Error("Failed to create item")
  }
  return response.json() as Promise<Item>
})

export const fetchItemById = createAsyncThunk("items/fetchItemById", async (id: string) => {
  const response = await fetch(`/api/items/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch item")
  }
  return response.json() as Promise<Item>
})

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ItemsFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSelectedItem: (state, action: PayloadAction<Item | null>) => {
      state.selectedItem = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch items"
      })
      // Create item
      .addCase(createItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false
        state.items.unshift(action.payload)
        state.total += 1
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create item"
      })
      // Fetch item by ID
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedItem = action.payload
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch item"
      })
  },
})

export const { setFilters, setSelectedItem, clearError } = itemsSlice.actions
export default itemsSlice.reducer
