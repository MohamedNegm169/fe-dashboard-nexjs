import { type NextRequest, NextResponse } from "next/server"
import type { Item } from "../../../../types/item"

// Mock data - same as in the main route
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const item = mockItems.find((item) => item.id === id)

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  return NextResponse.json(item)
}
