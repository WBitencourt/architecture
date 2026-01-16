import { Injectable } from '@nestjs/common';
import { OrmService } from '@/orm/orm.service';
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
  constructor(private readonly orm: OrmService) {}

  async create({ name, email }: CreateExampleParams): Promise<Example> {
    return await this.orm.example.create({
      data: {
        name,
        email,
      },
    });
  }

  async findAll(): Promise<Example[]> {
    return this.orm.example.findMany();
  }

  async findById({ id }: FindExampleByIdParams): Promise<Example | null> {
    return this.orm.example.findUnique({
      where: { id },
    });
  }

  async findByEmail({
    email,
  }: FindExampleByEmailParams): Promise<Example | null> {
    return this.orm.example.findUnique({
      where: { email },
    });
  }

  async update({ id, data }: UpdateExampleParams): Promise<Example> {
    return this.orm.example.update({
      where: { id },
      data,
    });
  }

  async deleteById({ id }: DeleteExampleParams): Promise<Example> {
    return this.orm.example.delete({
      where: { id },
    });
  }
}
