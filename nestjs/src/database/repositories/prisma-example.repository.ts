import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/prisma-database.service';
import {
  CreateExampleParams,
  DeleteExampleParams,
  Example,
  ExampleRepository,
  FindExampleByEmailParams,
  FindExampleByIdParams,
  UpdateExampleParams,
} from './example.repository';

@Injectable()
export class PrismaExampleRepository implements ExampleRepository {
  constructor(private readonly database: DatabaseService) {}

  async create({ name, email }: CreateExampleParams): Promise<Example> {
    return await this.database.example.create({
      data: {
        name,
        email,
      },
    });
  }

  async findAll(): Promise<Example[]> {
    return this.database.example.findMany();
  }

  async findById({ id }: FindExampleByIdParams): Promise<Example | null> {
    return this.database.example.findUnique({
      where: { id },
    });
  }

  async findByEmail({
    email,
  }: FindExampleByEmailParams): Promise<Example | null> {
    return this.database.example.findUnique({
      where: { email },
    });
  }

  async update({ id, data }: UpdateExampleParams): Promise<Example> {
    return this.database.example.update({
      where: { id },
      data,
    });
  }

  async deleteById({ id }: DeleteExampleParams): Promise<Example> {
    return this.database.example.delete({
      where: { id },
    });
  }
}
