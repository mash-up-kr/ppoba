import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeckService } from './DeckService';
import { CreateDeckDto } from './dto/CreateDeckDto';
import { UpdateDeckDto } from './dto/UpdateDeckDto';

@Controller('decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  async createDeck(@Body() createDeckDto: CreateDeckDto): Promise<any> {
    const result = await this.deckService.create(createDeckDto.name, createDeckDto.userId, createDeckDto.category);
    return { result: { deck_id: result } };
  }

  @Get('/:id')
  async findDeck(@Param('id') id: string): Promise<any> {
    const result = await this.deckService.findDeck(id);
    return { result: result };
  }

  @Patch(':id')
  async updateDeck(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
    return await this.deckService.updateDeck(id, updateDeckDto);
  }

  @Delete(':id')
  async removeDeck(@Param('id') id: string) {
    return await this.deckService.removeDeck(id);
  }
}
