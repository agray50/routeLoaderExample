import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IntegrationUser } from '@integration/types';

@Injectable()
export class IntegrationService {
  private readonly logger = new Logger(IntegrationService.name);
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'INTEGRATION_URL',
      'http://localhost:3001',
    );
  }

  async getUserByUuid(uuid: string): Promise<IntegrationUser | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<IntegrationUser[]>(`${this.baseUrl}/users`, {
          params: { uuid },
        }),
      );

      const users = response.data;
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      this.logger.warn(`Failed to fetch user ${uuid} from integration: ${error}`);
      return null;
    }
  }
}
