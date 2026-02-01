import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceController } from '@resource/resource.controller';
import { ResourceService } from '@resource/resource.service';
import { Resource } from '@resource/resource.entity';
import { IntegrationModule } from '@integration/integration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource]),
    IntegrationModule,
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
