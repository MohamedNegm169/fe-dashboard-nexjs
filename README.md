# Dashboard App

A comprehensive dashboard application built with Next.js, Redux Toolkit, TypeScript, and Tailwind CSS. This project demonstrates modern React development practices with full CRUD functionality, search/filter capabilities, and comprehensive testing.

## Features

- **Item Management**: Create, read, update, and delete items with title, description, and status
- **Search & Filter**: Real-time search by title/description and filter by status
- **Pagination**: Efficient pagination with page navigation controls
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Loading States**: Skeleton loaders and proper loading indicators
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Form Validation**: Client-side validation with real-time feedback
- **Modal Interfaces**: Clean modal dialogs for item details and forms
- **Testing**: Comprehensive test coverage with Jest and React Testing Library

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Radix UI primitives
- **TypeScript**: Full type safety throughout the application
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd dashboard-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Dashboard page
├── components/            # React components
│   ├── items/            # Item-related components
│   ├── providers/        # Context providers
│   └── ui/              # Reusable UI components
├── lib/                  # Utilities and configuration
│   ├── features/        # Redux slices
│   ├── hooks.ts         # Redux hooks
│   ├── store.ts         # Redux store
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
├── hooks/              # Custom React hooks
└── __tests__/          # Test files
\`\`\`

## API Endpoints

### GET /api/items
Retrieve items with optional filtering and pagination.

**Query Parameters:**
- `search` - Search by title or description
- `status` - Filter by status (active, inactive, pending)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### POST /api/items
Create a new item.

**Request Body:**
\`\`\`json
{
  "title": "Item Title",
  "description": "Item Description",
  "status": "active"
}
\`\`\`

### GET /api/items/[id]
Retrieve a specific item by ID.

## Testing

The project includes comprehensive test coverage:

- **Component Tests**: Testing UI components and user interactions
- **Redux Tests**: Testing state management and async actions
- **API Tests**: Testing API endpoints and data handling
- **Integration Tests**: Testing component integration with Redux

Run tests with:
\`\`\`bash
npm run test
\`\`\`

## Assumptions Made

1. **Mock Data**: Using in-memory mock data instead of a real database for simplicity
2. **Authentication**: No authentication system implemented (would be added in production)
3. **Real-time Updates**: No WebSocket or real-time updates (would use Socket.io or similar)
4. **File Uploads**: No file upload functionality for item attachments
5. **Bulk Operations**: No bulk edit/delete operations
6. **Advanced Filtering**: Limited to basic search and status filtering

## What I'd Improve With More Time

### Performance Optimizations
- Implement virtual scrolling for large datasets
- Add React.memo and useMemo optimizations
- Implement proper caching strategies with React Query
- Add service worker for offline functionality

### Enhanced Features
- Advanced filtering (date ranges, multiple criteria)
- Bulk operations (select multiple items, bulk edit/delete)
- Drag and drop reordering
- Export functionality (CSV, PDF)
- Item categories and tags
- File attachments and image uploads

### User Experience
- Keyboard shortcuts for power users
- Undo/redo functionality
- Auto-save drafts
- Advanced search with suggestions
- Dark/light theme toggle
- Customizable dashboard layouts

### Technical Improvements
- Real database integration (PostgreSQL, MongoDB)
- Authentication and authorization (NextAuth.js)
- Real-time updates with WebSockets
- API rate limiting and caching
- Comprehensive logging and monitoring
- CI/CD pipeline with automated testing
- Docker containerization
- Performance monitoring (Sentry, Analytics)

### Testing & Quality
- E2E testing with Playwright
- Visual regression testing
- Performance testing
- Accessibility testing (axe-core)
- Code coverage reporting
- Automated security scanning

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
"# fe-dashboard-nexjs" 
