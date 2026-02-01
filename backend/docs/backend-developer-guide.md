# Backend Developer Guide

## Introduction

This is a NestJS REST API following a **feature-first** directory structure. Each feature is isolated and self-contained, making the codebase easy to navigate and extend.

## Creating a New Feature

Use the Nest CLI to scaffold new features. The `--no-spec` flag skips test file generation.

```bash
# Generate a feature module
nest generate module <feature-name> --no-spec

# Generate a controller
nest generate controller <feature-name> --no-spec

# Generate a service
nest generate service <feature-name> --no-spec
```

These commands are the preferred way to create new features.

## Project Structure Overview

```
src/
├── common/          # Shared utilities (exceptions, filters, pipes, guards)
├── main.ts          # Application bootstrap and global configuration
├── app.module.ts    # Root application module
└── <feature>/       # Feature directories
```

Everything outside `common` and root files is a feature.

## Feature Directory Structure

Each directory under `src/` (excluding `common`) represents a single feature/domain.

```
<feature>/
├── dto/                      # Request and response DTOs
├── <feature>.entity.ts       # TypeORM entity
├── <feature>.controller.ts   # HTTP layer
├── <feature>.service.ts      # Business logic
└── <feature>.module.ts       # Feature wiring
```

**Responsibilities:**

| Layer | Responsibility |
|-------|----------------|
| Controller | HTTP concerns only (routing, request/response handling) |
| Service | Business logic and rules |
| Entity | Database table mapping |
| DTO | API contract definitions |

## Error Handling

The API uses centralized error handling. All errors return a consistent shape:

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable message",
  "details": {}
}
```

**Exception Types:**

| Exception | HTTP Status | When to Use |
|-----------|-------------|-------------|
| `ApiException` | Varies | Base class for custom errors |
| `NotFoundApiException` | 404 | Resource does not exist |
| `ConflictApiException` | 409 | Duplicate resource or state conflict |
| `ValidationApiException` | 400 | Business rule validation failure |
| `UnauthorizedApiException` | 401 | Missing or invalid authentication |
| `ForbiddenApiException` | 403 | Authenticated but lacking permission |

A global exception filter catches all errors and prevents implementation details from leaking.

**Usage Example:**

```typescript
import { NotFoundApiException, ConflictApiException } from '@common/exceptions';

@Injectable()
export class UserService {
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundApiException('USER_NOT_FOUND', `User ${id} not found`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictApiException('EMAIL_EXISTS', 'Email already registered');
    }
    return this.userRepository.save(dto);
  }
}
```

## Request Validation

- All incoming requests are validated globally via a configured `ValidationPipe`
- DTOs define validation rules using `class-validator` decorators
- Unknown fields are automatically rejected
- Invalid requests return a structured validation error with field-level details

## Conventions

- Always use DTOs for request bodies
- Do not throw raw `HttpException` in services — use semantic exceptions
- Keep features isolated and self-contained
- Shared logic belongs in `common/`
- Use path aliases (`@feature/`, `@common/`) for imports
