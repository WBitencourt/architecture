import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExampleBodyDto {
  @ApiProperty({
    description: 'ID to update from example table',
    example: '10',
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email to update from example table',
    example: 'example@example.com',
    type: String,
    required: true,
    nullable: false,
  })
  @IsEmail()
  email: string;
}
