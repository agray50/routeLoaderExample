import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ResourceService } from '@resource/resource.service';
import { ResourceResponseDto } from '@resource/dto';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('health')
  health(): { status: string } {
    return { status: 'ok' };
  }

  @Get(':uuid')
  async getOrCreate(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<ResourceResponseDto> {
    return this.resourceService.getOrCreate({ uuid });
  }
}
