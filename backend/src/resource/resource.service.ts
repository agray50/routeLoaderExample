import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '@resource/resource.entity';
import { CreateResourceDto, ResourceResponseDto } from '@resource/dto';
import { IntegrationService } from '@integration/integration.service';
import { NotFoundApiException } from '@common/exceptions';

@Injectable()
export class ResourceService {
  private creationLocks: Map<string, Promise<Resource>> = new Map();

  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    private readonly integrationService: IntegrationService,
  ) {}

  async findOne(uuid: string): Promise<ResourceResponseDto> {
    const resource = await this.resourceRepository.findOne({
      where: { uuid },
    });

    if (!resource) {
      throw new NotFoundApiException(
        'RESOURCE_NOT_FOUND',
        `Resource with UUID ${uuid} not found`,
      );
    }

    return this.toResponseDto(resource);
  }

  async getOrCreate(dto: CreateResourceDto): Promise<ResourceResponseDto> {
    const existing = await this.resourceRepository.findOne({
      where: { uuid: dto.uuid },
    });

    if (existing) {
      return this.toResponseDto(existing);
    }

    if (this.creationLocks.has(dto.uuid)) {
      const resource = await this.creationLocks.get(dto.uuid)!;
      return this.toResponseDto(resource);
    }

    const creationPromise = this.createResource(dto);
    this.creationLocks.set(dto.uuid, creationPromise);

    try {
      const resource = await creationPromise;
      return this.toResponseDto(resource);
    } finally {
      this.creationLocks.delete(dto.uuid);
    }
  }

  private async createResource(dto: CreateResourceDto): Promise<Resource> {
    // Fetch name from integration service
    const user = await this.integrationService.getUserByUuid(dto.uuid);
    const name = user?.name || `Resource ${dto.uuid.slice(0, 8)}`;

    const resource = this.resourceRepository.create({
      uuid: dto.uuid,
      name,
    });

    await this.resourceRepository
      .createQueryBuilder()
      .insert()
      .into(Resource)
      .values(resource)
      .orIgnore()
      .execute();

    const saved = await this.resourceRepository.findOne({
      where: { uuid: dto.uuid },
    });

    return saved!;
  }

  private toResponseDto(resource: Resource): ResourceResponseDto {
    return {
      uuid: resource.uuid,
      name: resource.name,
      createdAt: resource.createdAt.toISOString(),
    };
  }
}
