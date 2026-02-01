import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IntegrationUser } from '@integration/types';
export declare class IntegrationService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly baseUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getUserByUuid(uuid: string): Promise<IntegrationUser | null>;
}
