import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  pricePerDay: number;
}

export class UpdateCarDto {
  @ApiProperty({ required: false })
  brand?: string;

  @ApiProperty({ required: false })
  model?: string;

  @ApiProperty({ required: false })
  year?: number;

  @ApiProperty({ required: false })
  pricePerDay?: number;

  @ApiProperty({ required: false })
  isAvailable?: boolean;
}
