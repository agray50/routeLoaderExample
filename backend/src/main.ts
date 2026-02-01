import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { globalValidationPipe } from '@common/pipes';
import { ApiExceptionFilter } from '@common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(globalValidationPipe);
  app.useGlobalFilters(new ApiExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();
