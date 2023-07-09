import { Controller, Post, Body, Get } from '@nestjs/common';
import { CardService } from './CardService';
import { Card } from '../../core/database';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getTestCard() {
    return 'card';
  }

  @Post()
  async onCreateCard(@Body() cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    return this.cardService.create(cardDto);
  }
}
