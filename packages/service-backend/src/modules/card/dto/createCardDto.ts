import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '덱 ID', required: true })
  deckId: string;

  @ValidateNested({ each: true })
  @Type(() => CardList)
  @ArrayNotEmpty()
  @ApiProperty({ example: '[{content: "sdfsd"},{content: "sdfs"}]', required: true })
  cardList: CardList[];
}

export class CardList {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '카드내용', required: true })
  content: string;
}
