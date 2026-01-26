import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExampleRepository } from '@/database/repositories/example.repository';

interface CreateExampleParams {
  name: string;
  email: string;
}

interface UpdateExampleParams {
  id: string;
  data: {
    name: string;
  };
}

interface DeleteExampleParams {
  id: string;
}

@Injectable()
export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  async findAll() {
    try {
      const data = await this.exampleRepository.findAll();

      return {
        message: 'Data fetched successfully!',
        data,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        error.message = `ExampleService - getExample -> ${error.message}`;
      }
      throw error;
    }
  }

  async create({ name, email }: CreateExampleParams) {
    try {
      const existingRecord = await this.exampleRepository.findByEmail({
        email,
      });

      if (existingRecord) {
        throw new HttpException(
          `Record with e-mail "${email}" already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdData = await this.exampleRepository.create({
        name,
        email,
      });

      return {
        message: 'Data created successfully!',
        data: createdData,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        error.message = `ExampleService - createExample -> ${error.message}`;
      }
      throw error;
    }
  }

  async update({ id, data }: UpdateExampleParams) {
    try {
      const existingRecord = await this.exampleRepository.findById({
        id,
      });

      if (!existingRecord) {
        throw new HttpException(
          `Example with ID ${id} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedData = await this.exampleRepository.update({
        id,
        data,
      });

      return {
        message: 'Data updated successfully!',
        data: updatedData,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        error.message = `ExampleService - updateExample -> ${error.message}`;
      }
      throw error;
    }
  }

  async delete({ id }: DeleteExampleParams) {
    const existingRecord = await this.exampleRepository.findById({ id });

    if (!existingRecord) {
      throw new HttpException(
        `Record with ID ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedData = await this.exampleRepository.deleteById({ id });

    return {
      message: 'Data deleted successfully!',
      data: deletedData,
    };
  }
}
