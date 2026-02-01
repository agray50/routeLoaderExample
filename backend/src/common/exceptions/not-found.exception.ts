import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@/common/exceptions/api.exception';

export class NotFoundApiException extends ApiException {
  constructor(code: string, message: string, details?: unknown) {
    super(HttpStatus.NOT_FOUND, { code, message, details });
  }
}
