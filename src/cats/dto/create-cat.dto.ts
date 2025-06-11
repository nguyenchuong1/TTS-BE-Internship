import { ApiProperty } from '@nestjs/swagger';
export class CreateCatDto {
  @ApiProperty({
    example: 'Mèo Cỏ',
    description: 'The name of the cat',
  })
  name: string;
  @ApiProperty({
    example: 55,
    description: 'The age of the Cat',
  })
  age: number;
  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;
}
