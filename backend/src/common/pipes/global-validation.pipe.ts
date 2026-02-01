import { ValidationPipe, UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

interface FieldError {
  field: string;
  errors: string[];
}

function flattenValidationErrors(errors: ValidationError[]): FieldError[] {
  const result: FieldError[] = [];

  for (const error of errors) {
    if (error.constraints) {
      result.push({
        field: error.property,
        errors: Object.values(error.constraints),
      });
    }

    if (error.children && error.children.length > 0) {
      const childErrors = flattenValidationErrors(error.children);
      for (const childError of childErrors) {
        result.push({
          field: `${error.property}.${childError.field}`,
          errors: childError.errors,
        });
      }
    }
  }

  return result;
}

export const globalValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  exceptionFactory: (errors: ValidationError[]) => {
    const details = flattenValidationErrors(errors);
    return new UnprocessableEntityException({
      code: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      details,
    });
  },
});
