import { Module } from '@nestjs/common';
import { ExampleController } from '@/http/routes/example/example.controller';
import { ExampleService } from '@/http/routes/example/example.service';
import { OrmModule } from '@/orm/orm.module';
import { ExampleRepository } from './prisma-example.repository';

@Module({
  imports: [OrmModule],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleRepository],
})
export class ExampleModule {}
