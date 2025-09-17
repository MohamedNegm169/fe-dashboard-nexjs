export interface Item {
  id: string
  title: string
  description: string
  status: "active" | "inactive" | "pending"
  createdAt: string
  updatedAt: string
}

export interface ItemsResponse {
  items: Item[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CreateItemRequest {
  title: string
  description: string
  status: "active" | "inactive" | "pending"
}

export interface ItemsFilters {
  search?: string
  status?: "active" | "inactive" | "pending" | "all"
  page?: number
  limit?: number
}
