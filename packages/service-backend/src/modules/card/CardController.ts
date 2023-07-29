import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CardService } from './CardService';
import { Card } from '../../core/database';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCardDto, CardList } from './dto/createCardDto';

@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: '카드 생성 API', description: '카드 bulk upload' })
  @ApiCreatedResponse({ description: '카드를 생성한다.', type: CreateCardDto })
  @ApiBody({ type: CreateCardDto })
  @Post()
  async CreateCard(
    @Body('cardList') createCardList: CardList[],
    @Body('deckId') deckId: string
  ): Promise<{ result: boolean }> {
    const result = await this.cardService.create(createCardList, deckId);
    return { result: result };
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<{ result: boolean }> {
    const result = await this.cardService.deleteCard(id);
    return { result: result };
  }

  @Patch(':id')
  async updateCard(
    @Param('id') id: string,
    @Body() cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>
  ): Promise<object> {
    const result = this.cardService.updateCard(id, cardDto);
    return { result: result };
  }
}
