import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from '@user/user.entity';
import { UserResponseDto } from '@user/dto';
import { IntegrationService } from '@integration/integration.service';
import { NotFoundApiException } from '@common/exceptions';

@Injectable()
export class UserService {
  private creationLocks: Map<string, Promise<User>> = new Map();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly integrationService: IntegrationService,
  ) {}

  async getOrCreate(id: string): Promise<UserResponseDto> {
    const existing = await this.userRepository.findOne({
      where: { id },
    });

    if (existing) {
      return this.toResponseDto(existing);
    }

    if (this.creationLocks.has(id)) {
      const user = await this.creationLocks.get(id)!;
      return this.toResponseDto(user);
    }

    const creationPromise = this.createUser(id);
    this.creationLocks.set(id, creationPromise);

    try {
      const user = await creationPromise;
      return this.toResponseDto(user);
    } finally {
      this.creationLocks.delete(id);
    }
  }

  private async createUser(id: string): Promise<User> {
    const integrationUser = await this.integrationService.getUserByUuid(id);

    if (!integrationUser) {
      throw new NotFoundApiException(
        'USER_NOT_FOUND',
        `User with ID ${id} not found`,
      );
    }

    const user = this.userRepository.create({
      id,
      name: integrationUser.name,
    });

    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .orIgnore()
      .execute();

    const saved = await this.userRepository.findOne({
      where: { id },
    });

    return saved!;
  }

  private toResponseDto(user: User): UserResponseDto {
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
