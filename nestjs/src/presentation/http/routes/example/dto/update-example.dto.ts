import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExampleParamDto {
  @ApiProperty({
    description: 'ID to update from example table',
    example: '10',
    type: String,
    required: true,
    nullable: false,
  })
  @IsUUID()
  readonly id: string;
}

export class UpdateExampleBodyDto {
  @ApiProperty({
    description: 'ID to update from example table',
    example: '10',
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  name: string;
}
