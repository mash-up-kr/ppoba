import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Controller('decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  async createDeck(@Body() createDeckDto: CreateDeckDto) {
    return await this.deckService.create(createDeckDto);
  }

  @Get(':id')
  async findDeck(@Param('id') id: string) {
    return await this.deckService.findDeck(id);
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
