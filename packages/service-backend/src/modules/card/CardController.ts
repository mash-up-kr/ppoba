import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CardService } from './CardService';
import { Card } from '../../core/database';
import { ApiTags } from '@nestjs/swagger';
import { createCardDto } from './dto/createCardDto';
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiTags('card')
  @Post()
  async CreateCard(
    @Body('cardList') cardDto: createCardDto[],
    @Body('deckId') deckId: string
  ): Promise<any> {
    const result = await this.cardService.create(cardDto, deckId);
    return { result: result };
  }

  @ApiTags('card')
  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<any> {
    await this.cardService.deleteCard(id);
    return { message: '카드가 삭제되었습니다.' };
  }

  @ApiTags('card')
  @Patch(':id')
  async updateCard(
    @Param('id') id: string,
    @Body() cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>
  ): Promise<any> {
    return this.cardService.updateCard(id, cardDto);
  }
}
