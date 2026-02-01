import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IntegrationService } from '@integration/integration.service';

@Module({
  imports: [HttpModule],
  providers: [IntegrationService],
  exports: [IntegrationService],
})
export class IntegrationModule {}
