import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@/common/exceptions/api.exception';

export class ForbiddenApiException extends ApiException {
  constructor(code: string, message: string, details?: unknown) {
    super(HttpStatus.FORBIDDEN, { code, message, details });
  }
}
