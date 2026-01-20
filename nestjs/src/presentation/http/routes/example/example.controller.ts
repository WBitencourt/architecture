import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExampleService } from '@/presentation/http/routes/example/example.service';
import { DeleteExampleDto } from '@/presentation/http/routes/example/dto/delete-example.dto';
import { CreateExampleBodyDto } from './dto/create-example.dto';

import {
  UpdateExampleBodyDto,
  UpdateExampleParamDto,
} from '@/presentation/http/routes/example/dto/update-example.dto';

@ApiTags('Example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('')
  async findAll() {
    return await this.exampleService.findAll();
  }

  @Post('')
  async create(@Body() body: CreateExampleBodyDto) {
    return await this.exampleService.create({
      name: body.name,
      email: body.email,
    });
  }

  @Patch(':id')
  async update(
    @Param() param: UpdateExampleParamDto,
    @Body() body: UpdateExampleBodyDto,
  ) {
    return await this.exampleService.update({
      id: param.id,
      data: {
        name: body.name,
      },
    });
  }

  @Delete(':id')
  async delete(@Param() param: DeleteExampleDto) {
    return await this.exampleService.delete({ id: param.id });
  }
}
