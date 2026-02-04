import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { IntegrationUser } from '@integration/types';
import { ServiceUnavailableApiException } from '@common/exceptions';

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

  async getUserById(id: string): Promise<IntegrationUser | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<IntegrationUser[]>(`${this.baseUrl}/users`, {
          params: { id },
        }),
      );

      const users = response.data;
      if (users.length === 0) {
        return null;
      }

      return plainToInstance(IntegrationUser, users[0], {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.logger.error(`Integration service error for user ${id}`, error);
      throw new ServiceUnavailableApiException(
        'INTEGRATION_UNAVAILABLE',
        'Unable to reach integration service',
      );
    }
  }
}
