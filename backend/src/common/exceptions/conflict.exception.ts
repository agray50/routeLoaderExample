import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@/common/exceptions/api.exception';

export class ConflictApiException extends ApiException {
  constructor(code: string, message: string, details?: unknown) {
    super(HttpStatus.CONFLICT, { code, message, details });
  }
}
