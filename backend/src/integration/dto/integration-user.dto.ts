import { Expose } from 'class-transformer';

export class IntegrationUserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
