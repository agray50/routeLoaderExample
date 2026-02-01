import { HttpException, HttpStatus } from '@nestjs/common';

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export class ApiException extends HttpException {
  constructor(status: HttpStatus, error: ApiError) {
    super(
      {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined && { details: error.details }),
      },
      status,
    );
  }
}
