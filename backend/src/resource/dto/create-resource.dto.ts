import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateResourceDto {
  @IsUUID()
  uuid: string;

  @IsString()
  @IsOptional()
  name?: string;
}
