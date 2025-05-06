import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Acesso ao ConfigService (opcional aqui, útil se você quiser mais controle)
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  app.useStaticAssets(join(__dirname, '..', 'public', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(port, '0.0.0.0');
}
bootstrap();
