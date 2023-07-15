import { IsString, IsEnum, ArrayNotEmpty } from 'class-validator';
import { DeckCategory } from '../DeckConstant';

export class CreateDeckDto {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @ArrayNotEmpty()
  @IsEnum(DeckCategory, { each: true })
  category: DeckCategory[];
}