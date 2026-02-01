# Route Loader Example

A production-style full-stack application showcasing React Router v6.4+ loaders with NestJS, PostgreSQL, TypeORM, and external data integration via json-server.

## Features

- **React Router v6.4+ Loaders**: Data fetching before component rendering
- **Material UI**: Dashboard with users table, resource pages with tabbed content
- **Global Spinner**: Loading indicator while loaders run
- **Error Handling**: Styled error page for failed requests
- **Lazy Resource Creation**: Backend creates resources on-demand
- **Idempotent Operations**: Concurrent requests only create one resource
- **External Data Integration**: Users fetched from json-server
- **Name Persistence**: Name from external system is persisted on first creation
- **PostgreSQL + TypeORM**: Production-ready database with DTOs
- **Docker Compose**: Full-stack deployment with one command

## Quick Start

### Option 1: Docker Compose (Recommended)

Deploy the entire stack with a single command:

```bash
docker compose up --build
```

This starts:
- **PostgreSQL** on port 5432
- **json-server** on port 3001 (external user data)
- **Backend (NestJS)** on port 3000
- **Frontend (nginx)** on port 8080

Open http://localhost:8080 in your browser.

### Option 2: Development Mode

For local development with hot reload:

**1. Start PostgreSQL:**
```bash
docker compose up postgres -d
```

**2. Start json-server (external users):**
```bash
cd json-server
npm install
npm run dev
```
json-server runs on http://localhost:3001

**3. Start Backend:**
```bash
cd backend
npm install
npm run dev
```
Backend runs on http://localhost:3000

**4. Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (nginx + React + MUI)                │
│                      http://localhost:8080                       │
├─────────────────────────────────────────────────────────────────┤
│  1. Dashboard fetches users from json-server                     │
│  2. User clicks "View" → navigates to /resource/:uuid            │
│  3. Loader calls backend with UUID                               │
│  4. Global spinner shows while loading                           │
│  5. ResourcePage renders with header and tabbed content          │
└─────────────────────────────────────────────────────────────────┘
         │                                    │
         ▼                                    ▼
┌─────────────────────┐          ┌─────────────────────────────────┐
│  json-server        │          │   Backend (NestJS + TypeORM)    │
│  :3001              │          │   :3000                         │
├─────────────────────┤          ├─────────────────────────────────┤
│  GET /users         │          │  GET /api/resource/:uuid        │
│  - Returns 10 users │          │  1. Validate UUID               │
│  - Each has UUID    │          │  2. Check if resource exists    │
│    and name         │          │  3. If new: fetch name from     │
└─────────────────────┘◄─────────│     json-server, then create    │
                                 │  4. Return resource             │
                                 └─────────────────────────────────┘
                                              │
                                              ▼
                                 ┌─────────────────────────────────┐
                                 │    PostgreSQL (Docker)          │
                                 │    :5432                        │
                                 ├─────────────────────────────────┤
                                 │  resources table:               │
                                 │  - uuid (PRIMARY KEY)           │
                                 │  - name (fetched from integration)│
                                 │  - created_at                   │
                                 └─────────────────────────────────┘
```

## Key Concepts

### Why Resource Creation Happens in the Backend

- The backend is the authoritative source for resource state
- It ensures data consistency across all clients
- It can enforce business rules (like idempotency)
- It persists data to PostgreSQL with ACID guarantees

### Why the Loader Guarantees Existence

- React Router v6.4+ loaders run BEFORE the component mounts
- The component won't render until the loader resolves
- This ensures `useLoaderData()` always returns valid data
- If the loader throws, the error boundary renders instead

### Backend-Driven Integration

- When a resource doesn't exist, the backend fetches the name from json-server
- The name is captured at creation time and persisted
- Subsequent requests return the stored resource without calling the integration
- Uses `INSERT ... ON CONFLICT DO NOTHING` for idempotency

## API Endpoints

### Backend (NestJS)

| Endpoint | Description |
|----------|-------------|
| `GET /api/resource/health` | Health check endpoint |
| `GET /api/resource/:uuid` | Get or create resource (fetches name from integration on creation) |

### json-server

| Endpoint | Description |
|----------|-------------|
| `GET /users` | Get all users (10 seeded users with UUID + name) |

## Docker Services

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| postgres | route-loader-db | 5432 | PostgreSQL database |
| json-server | route-loader-json-server | 3001 | External user data |
| backend | route-loader-backend | 3000 | NestJS API server |
| frontend | route-loader-frontend | 8080 | nginx serving React app |

## Key Files

### Frontend

| File | Purpose |
|------|---------|
| `src/pages/Dashboard.tsx` | Dashboard with users table |
| `src/pages/ResourcePage.tsx` | Resource page with header and tabs |
| `src/components/UsersTable.tsx` | Material UI table fetching users |
| `src/components/resource/ResourceHeader.tsx` | Displays resource name and UUID |
| `src/components/resource/ResourceTabs.tsx` | Material UI tabbed content |
| `src/loaders/resourceLoader.ts` | Loader with name parameter |
| `src/api/client.ts` | Axios clients for users and resources |

### Backend

| File | Purpose |
|------|---------|
| `src/resource/resource.entity.ts` | TypeORM entity (uuid, name, createdAt) |
| `src/resource/dto/*.ts` | Request/response DTOs |
| `src/resource/resource.controller.ts` | REST controller |
| `src/resource/resource.service.ts` | Idempotent resource creation |
| `src/integration/integration.service.ts` | Fetches user data from json-server |

### json-server

| File | Purpose |
|------|---------|
| `db.json` | Seeded user data (10 users) |

## Testing the Application

1. Open http://localhost:8080 (or :5173 in dev mode)
2. See the Dashboard with Users table populated from json-server
3. Click "View" on any user
4. Observe the global spinner while loading
5. See the Resource page with header (name + UUID) and tabbed content
6. Switch between tabs to view different content sections
7. Click "View" again on the same user - the name persists from first creation
8. Navigate to an invalid UUID to see the error page

## Stopping Services

```bash
# Stop all services
docker compose down

# Stop and remove database volume (clears all data)
docker compose down -v

# Rebuild images after code changes
docker compose up --build
```

## License

MIT
