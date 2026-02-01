import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResourceModule } from '@resource/resource.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ResourceModule,
  ],
})
export class AppModule {}
