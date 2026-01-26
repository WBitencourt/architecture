import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/typeorm-database.service';
import { Example as ExampleEntity } from '../typeorm/entity/example';

import {
  CreateExampleParams,
  DeleteExampleParams,
  Example,
  FindExampleByEmailParams,
  FindExampleByIdParams,
  UpdateExampleParams,
} from './example.repository';

@Injectable()
export class ExampleRepository {
  constructor(private readonly database: DatabaseService) {
    // Dependency injection only
  }

  async create({ name, email }: CreateExampleParams): Promise<Example> {
    const exampleRepository =
      this.database.dataSource.getRepository(ExampleEntity);

    const example = exampleRepository.create({
      name,
      email,
    });

    console.log('exampleRepository-new-name', example.name);

    return exampleRepository.save(example);
  }

  async findAll(): Promise<Example[]> {
    const exampleRepository =
      this.database.dataSource.getRepository(ExampleEntity);

    return exampleRepository.find();
  }

  async findById({ id }: FindExampleByIdParams): Promise<Example | null> {
    const exampleRepository =
      this.database.dataSource.getRepository(ExampleEntity);

    return exampleRepository.findOne({
      where: { id },
    });
  }

  async findByEmail({
    email,
  }: FindExampleByEmailParams): Promise<Example | null> {
    const exampleRepository =
      this.database.dataSource.getRepository(ExampleEntity);

    return exampleRepository.findOne({
      where: { email },
    });
  }

  async update({ id, data }: UpdateExampleParams): Promise<Example> {
    const exampleRepository =
      this.database.dataSource.getRepository(ExampleEntity);

    const example = await exampleRepository.findOne({
      where: { id },
    });

    if (!example) {
      throw new Error('Example not found');
    }

    example.name = data.name;

    return exampleRepository.save(example);
  }

  async deleteById({ id }: DeleteExampleParams): Promise<Example> {
    const exampleRepository =
      this.database.dataSource.getRepository(ExampleEntity);

    const example = await exampleRepository.findOne({
      where: { id },
    });

    if (!example) {
      throw new Error('Example not found');
    }

    await exampleRepository.delete(example);
    return example;
  }
}
