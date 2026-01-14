import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/http/routes/app.module';
import { env } from '../config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT);
}

bootstrap()
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`);
  })
  .catch((error) => {
    console.error('Error starting server', error);
  });
