import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@/common/exceptions/api.exception';

export class UnauthorizedApiException extends ApiException {
  constructor(code: string, message: string, details?: unknown) {
    super(HttpStatus.UNAUTHORIZED, { code, message, details });
  }
}
