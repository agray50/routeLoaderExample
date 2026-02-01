import { Expose } from 'class-transformer';

export class ResourceResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  createdAt: string;
}
