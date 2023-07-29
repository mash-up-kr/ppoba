import { IsString, IsEnum, ArrayNotEmpty } from 'class-validator';
import { DeckCategory } from '../DeckConstant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeckDto {
  @IsString()
  @ApiProperty({ example: 'name of deck', required: true })
  name: string;

  @IsString()
  @ApiProperty({ example: 'user ID', required: true })
  userId: string;

  @ArrayNotEmpty()
  @IsEnum(DeckCategory, { each: true })
  @ApiProperty({ example: 'list of category' } )
  category: DeckCategory[];
}