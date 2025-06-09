import { ApiProperty } from '@nestjs/swagger';
export class CreateCatDto {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: Number,
  })
  age: number;

  @ApiProperty({
    type: String,
  })
  breed: string;
}
