import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CardService } from './CardService';
import { Card } from '../../core/database';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCardDto, CardList } from './dto/createCardDto';

// TODO 다른 api에서  swagger docs쓸때 query로 쓰면 됨
//   @ApiQuery({
//   name: 'deckId',
//   description: '덱 ID',
//   example: 'deckId',
//   type: String,
// })
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
  ): Promise<any> {
    const result = await this.cardService.create(createCardList, deckId);
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
