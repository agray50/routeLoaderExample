import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UserResponseDto } from '@user/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getOrCreate(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getOrCreate(id);
  }
}
