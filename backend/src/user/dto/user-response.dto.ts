import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
  createdAt: string;
}
