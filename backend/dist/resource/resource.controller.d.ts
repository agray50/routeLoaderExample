import { ResourceService } from '@resource/resource.service';
import { ResourceResponseDto } from '@resource/dto';
export declare class ResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    health(): {
        status: string;
    };
    getOrCreate(uuid: string): Promise<ResourceResponseDto>;
}
