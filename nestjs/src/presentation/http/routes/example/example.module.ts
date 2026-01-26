import { Module } from '@nestjs/common';
import { ExampleController } from '@/presentation/http/routes/example/example.controller';
import { ExampleService } from '@/presentation/http/routes/example/example.service';
import { DatabaseModule } from '@/database/typeorm-database.module';
import { ExampleRepository } from '@/database/repositories/typeorm-example.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleRepository],
})
export class ExampleModule {}
