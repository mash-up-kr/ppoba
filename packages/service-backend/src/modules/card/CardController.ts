import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CardService } from './CardService';
import { Card } from '../../core/database';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async CreateCard(
    @Body('cardList') cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>[]
  ): Promise<any> {
    const result = await this.cardService.create(cardDto);
    return { result: result };
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<any> {
    await this.cardService.deleteCard(id);
    return { message: '카드가 삭제되었습니다.' };
  }

  @Patch(':id')
  async updateCard(
    @Param('id') id: string,
    @Body() cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>
  ): Promise<any> {
    return this.cardService.updateCard(id, cardDto);
  }
}
