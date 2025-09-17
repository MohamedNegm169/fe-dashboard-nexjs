import { type NextRequest, NextResponse } from "next/server"
import type { Item, ItemsResponse, CreateItemRequest } from "../../../types/item"

// Mock data - in a real app, this would come from a database
const mockItems: Item[] = [
  {
    id: "1",
    title: "Dashboard Implementation",
    description: "Build a comprehensive dashboard with React and TypeScript",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate with external APIs for data fetching",
    status: "pending",
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
  },
  {
    id: "3",
    title: "User Authentication",
    description: "Implement secure user authentication system",
    status: "inactive",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    title: "Database Migration",
    description: "Migrate legacy database to new schema",
    status: "active",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Testing Framework",
    description: "Set up comprehensive testing with Jest and React Testing Library",
    status: "pending",
    createdAt: "2024-01-11T11:20:00Z",
    updatedAt: "2024-01-11T11:20:00Z",
  },
  {
    id: "6",
    title: "Performance Optimization",
    description: "Optimize application performance and loading times",
    status: "active",
    createdAt: "2024-01-10T13:10:00Z",
    updatedAt: "2024-01-10T13:10:00Z",
  },
  {
    id: "7",
    title: "Mobile Responsiveness",
    description: "Ensure application works perfectly on mobile devices",
    status: "inactive",
    createdAt: "2024-01-09T08:30:00Z",
    updatedAt: "2024-01-09T08:30:00Z",
  },
  {
    id: "8",
    title: "Documentation",
    description: "Create comprehensive documentation for the project",
    status: "pending",
    createdAt: "2024-01-08T15:00:00Z",
    updatedAt: "2024-01-08T15:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || "all"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Filter items
  let filteredItems = mockItems

  if (search) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (status !== "all") {
    filteredItems = filteredItems.filter((item) => item.status === status)
  }

  // Sort by creation date (newest first)
  filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Pagination
  const total = filteredItems.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedItems = filteredItems.slice(startIndex, endIndex)

  const response: ItemsResponse = {
    items: paginatedItems,
    total,
    page,
    limit,
    totalPages,
  }

  return NextResponse.json(response)
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateItemRequest = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.status) {
      return NextResponse.json({ error: "Title, description, and status are required" }, { status: 400 })
    }

    // Create new item
    const newItem: Item = {
      id: (mockItems.length + 1).toString(),
      title: body.title,
      description: body.description,
      status: body.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockItems.unshift(newItem)

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
