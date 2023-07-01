import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Controller('decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  create(@Body() createDeckDto: CreateDeckDto) {
    return this.deckService.create(createDeckDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deckService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
    return this.deckService.update(id, updateDeckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deckService.remove(id);
  }
}
