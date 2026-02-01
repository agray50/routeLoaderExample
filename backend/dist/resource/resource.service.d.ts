import { Repository } from 'typeorm';
import { Resource } from '@resource/resource.entity';
import { CreateResourceDto, ResourceResponseDto } from '@resource/dto';
import { IntegrationService } from '@integration/integration.service';
export declare class ResourceService {
    private readonly resourceRepository;
    private readonly integrationService;
    private creationLocks;
    constructor(resourceRepository: Repository<Resource>, integrationService: IntegrationService);
    getOrCreate(dto: CreateResourceDto): Promise<ResourceResponseDto>;
    private createResource;
    private toResponseDto;
}
