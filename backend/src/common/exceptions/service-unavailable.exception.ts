import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@/common/exceptions/api.exception';

export class ServiceUnavailableApiException extends ApiException {
  constructor(code: string, message: string, details?: unknown) {
    super(HttpStatus.SERVICE_UNAVAILABLE, { code, message, details });
  }
}
