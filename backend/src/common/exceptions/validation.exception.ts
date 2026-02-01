import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@/common/exceptions/api.exception';

export class ValidationApiException extends ApiException {
  constructor(details: unknown) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, {
      code: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      details,
    });
  }
}
