import { Module } from '@nestjs/common';
import { ExampleController } from '@/presentation/http/routes/example/example.controller';
import { ExampleService } from '@/presentation/http/routes/example/example.service';
import { DatabaseModule } from '@/database/database.module';
import { ExampleRepository } from '@/database/repositories/prisma-example.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleRepository],
})
export class ExampleModule {}
