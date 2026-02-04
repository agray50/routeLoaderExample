import { Expose } from 'class-transformer';

export class IntegrationUser {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
