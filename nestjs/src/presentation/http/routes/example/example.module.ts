import { Module } from '@nestjs/common';
import { ExampleController } from '@/presentation/http/routes/example/example.controller';
import { ExampleService } from '@/presentation/http/routes/example/example.service';
import { DatabaseModule } from '@/database/typeorm-database.module';
import { TypeOrmExampleRepository } from '@/database/repositories/typeorm-example.repository';
import { ExampleRepository } from '@/database/repositories/example.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ExampleController],
  providers: [
    ExampleService,
    {
      provide: ExampleRepository,
      useClass: TypeOrmExampleRepository,
    },
  ],
})
export class ExampleModule {}
