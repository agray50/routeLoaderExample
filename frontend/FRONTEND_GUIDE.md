# Developer Guide

## 1. Project Structure

```
frontend/
├── src/
│   ├── api/                  # API clients and endpoint definitions
│   ├── assets/               # Static assets and global styles
│   ├── components/           # Reusable UI components
│   │   ├── cases/            # Case-specific components
│   │   ├── common/           # Shared components (RichTextField, etc.)
│   │   ├── layout/           # Layout components (Layout, Footer)
│   │   └── users/            # User-specific components
│   ├── context/              # React context definitions
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Route-level page components
│   │   ├── Cases/
│   │   ├── Home/
│   │   └── Users/
│   ├── providers/            # Context providers
│   ├── routes/               # Route configuration
│   ├── types/                # TypeScript type definitions
│   └── utils/
│       └── validators/       # Zod schemas

backend/
├── src/
│   ├── auth/                 # Authentication module
│   ├── cases/                # Cases module (controller, service)
│   ├── dto/                  # Data transfer objects
│   └── entities/             # TypeORM entities

json-server/                  # Mock user data service
```

---

## 2. Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Frontend   | React 18, TypeScript, Vite   |
| Styling    | Tailwind CSS v4, Material UI |
| Forms      | react-hook-form, Zod         |
| Rich Text  | react-quill-new              |
| Backend    | NestJS, TypeORM, PostgreSQL  |
| Mock Users | json-server                  |
| Container  | Docker Compose               |

---

## 3. Directory Reference

### Frontend (`frontend/src/`)

#### `api/`

API client configuration and endpoint functions.

- **Files**: `domain.api.ts` (`cases.api.ts`, `users.api.ts`)
- **Clients**: `client.ts` exports axios instances (`apiClient`, `usersClient`)
- **Functions**: async functions returning typed responses (`getAll`, `getOne`, `create`, `update`, `delete`)

#### `components/`

Reusable UI components, organised by domain.

- **Subfolders**: lowercase domain name (`cases/`, `users/`, `common/`, `layout/`)
- **Files**: PascalCase matching component (`CaseEditForm.tsx`, `UserTable.tsx`)
- **Exports**: named exports (`export function CaseEditForm`)
- **Props**: `ComponentNameProps` interface (`CaseEditFormProps`)
- **Index**: each subfolder has `index.ts` for barrel exports

#### `context/`

React context definitions (context object and types only).

- **Files**: `DomainContext.ts` (`UserContext.ts`)
- **Exports**: context object and value type (`UserContext`, `UserContextValue`)

#### `hooks/`

Custom React hooks for data fetching and shared logic.

- **Files**: `useDomain.ts` (`useUsers.ts`, `useCases.ts`, `useCurrentUser.ts`)
- **Functions**: `use` prefix, camelCase (`useUsers`, `useCase`)
- **Returns**: object with named properties (`{ data, loading, error }`)

#### `pages/`

Route-level page components that compose other components.

- **Subfolders**: PascalCase domain name (`Cases/`, `Users/`, `Home/`)
- **Files**: `DomainActionPage.tsx` (`CaseEditPage.tsx`, `UsersPage.tsx`)
- **Responsibility**: fetch data, pass to child components, handle navigation

#### `providers/`

Context providers that wrap the app or sections.

- **Files**: `DomainProvider.tsx` (`UserProvider.tsx`, `ThemeProvider.tsx`)
- **Responsibility**: manage state, call APIs, provide context value

#### `routes/`

React Router configuration.

- **Files**: `AppRoutes.tsx`
- **Responsibility**: map paths to page components

#### `types/`

TypeScript type definitions for domain entities.

- **Files**: `domain.types.ts` (`case.types.ts`, `user.types.ts`)
- **Interfaces**: `Entity`, `CreateEntityDto`, `UpdateEntityDto`, `EntityFormData`
- **Enums**: PascalCase with UPPER_SNAKE values (`CaseStatus.OPEN`)

#### `utils/validators/`

Zod schemas for form validation.

- **Files**: `domain.schema.ts` (`case.schema.ts`)
- **Variables**: camelCase with `Schema` suffix (`caseSchema`)
- **Inferred types**: `z.infer<typeof schema>` when needed

---

### Backend (`backend/src/`)

#### `auth/`

Authentication module (currently mock /me endpoint).

- **Files**: `auth.module.ts`, `auth.controller.ts`
- **Responsibility**: expose user context endpoint

#### `cases/`

Cases domain module.

- **Files**: `cases.module.ts`, `cases.controller.ts`, `cases.service.ts`
- **Controller**: REST endpoints (`@Get`, `@Post`, `@Put`, `@Delete`)
- **Service**: business logic and repository access

#### `dto/`

Data Transfer Objects for request validation.

- **Files**: `create-domain.dto.ts`, `update-domain.dto.ts`
- **Classes**: `CreateDomainDto`, `UpdateDomainDto`
- **Decorators**: `class-validator` (`@IsString`, `@IsUUID`, `@IsOptional`)

#### `entities/`

TypeORM entity definitions.

- **Files**: `domain.entity.ts` (`case.entity.ts`)
- **Classes**: PascalCase entity name (`Case`)
- **Enums**: co-located with entity (`CaseStatus`)

---

### Mock Services (`json-server/`)

Development-time mock API for users.

- **Files**: `db.json` (data), `package.json`
- **Data**: array of user objects with UUID `id`, `name`, `username`
- **Endpoint**: `GET /users`, `GET /users/:id`

---

## 4. Validation Approach

### TypeScript Types

- Define domain entities in `types/*.types.ts`
- Separate interfaces for: entity (`Case`), create DTO (`CreateCaseDto`), update DTO (`UpdateCaseDto`), form data (`CaseFormData`)
- UUIDs are typed as `string` throughout

### Zod Schemas

- Located in `utils/validators/*.schema.ts`
- Used for frontend form validation with react-hook-form
- Match the shape of `FormData` interfaces
- UUID fields use `z.string().uuid()` for validation

### Backend Validation

- NestJS uses `class-validator` decorators on DTO classes
- `@IsUUID()` for UUID fields
- `@IsString()`, `@IsOptional()`, `@IsEnum()` for field validation
- `@ValidateIf()` for conditional validation (nullable fields)

### Alignment Pattern

```
Frontend Form → Zod Schema → API Request → Backend DTO → Entity
     ↓              ↓              ↓            ↓          ↓
CaseFormData   caseSchema    CreateCaseDto  CreateCaseDto  Case
```

- Zod validates form input before submission
- Backend DTO validates incoming request body
- Both layers enforce the same constraints

### UUID Handling

- Generated by PostgreSQL (`uuid` type, `PrimaryGeneratedColumn('uuid')`)
- Passed as plain strings in API requests/responses
- Validated with `@IsUUID()` (backend) and `z.string().uuid()` (frontend)

---

## 5. General Guidelines

- **Single responsibility**: components do one thing; pages compose components
- **File size**: aim for <200 lines per component; extract if larger
- **Type reuse**: import from `types/` index; don't duplicate interfaces
- **Validation ownership**: Zod owns form validation, class-validator owns API validation
- **Styling preference**: Tailwind classes first, MUI `sx` prop for component-specific overrides
- **State management**: local state for forms; context for global (user auth)
- **Barrel exports**: every folder has an `index.ts`; import from folder, not file
