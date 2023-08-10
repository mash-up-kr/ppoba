import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Card } from '../../core/database';
import { Public } from '../../core/decorators';
import { CardService } from './CardService';
import { CardList } from './dto/createCardDto';

@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Public // TODO auth required
  @Post()
  async CreateCard(
    @Body('cardList') createCardList: CardList[],
    @Body('deckId') deckId: string
  ): Promise<{ result: boolean }> {
    const result = await this.cardService.create(createCardList, deckId);
    return { result: result };
  }

  @Public // TODO auth required
  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<{ result: boolean }> {
    const result = await this.cardService.deleteCard(id);
    return { result: result };
  }

  @Patch(':id')
  @Public // TODO auth required
  async updateCard(
    @Param('id') id: string,
    @Body() cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>
  ): Promise<object> {
    const result = this.cardService.updateCard(id, cardDto);
    return { result: result };
  }
}
