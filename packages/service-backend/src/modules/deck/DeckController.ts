import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeckService } from './DeckService';
import { CreateDeckDto } from './dto/CreateDeckDto';
import { UpdateDeckDto } from './dto/UpdateDeckDto';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('decks')
@Controller('decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @ApiOperation({ summary: 'deck creation api', description: 'upload a deck of cards' })
  // Todo : set type value 
  @ApiCreatedResponse({ description: 'create a deck of cards' })
  @ApiBody({ type: CreateDeckDto })
  @Post()
  async createDeck(@Body() createDeckDto: CreateDeckDto): Promise<any> {
    const result = await this.deckService.create(createDeckDto.name, createDeckDto.userId, createDeckDto.category);
    return { result: { deck_id: result } };
  }

  @ApiOperation({ summary: 'get Deck api', description: 'Get card information by deck id' })
  // Todo : set type value 
  @ApiCreatedResponse({ description: 'get list of cards in deck' })
  @ApiParam({
    name: 'id',
    required: true,
    description: "deck ID",
  })
  @Get('/:id')
  async findDeck(@Param('id') id: string): Promise<any> {
    const result = await this.deckService.findDeck(id);
    return { result: result };
  }

  @ApiOperation({ summary: 'get list of cards in Deck', description: 'Get card information by deck id' })
  // Todo : set type value 
  @ApiCreatedResponse({ description: 'get list of cards in deck' })
  @ApiParam({
    name: 'id',
    required: true,
    description: "deck ID",
  })
  @Get(":id/cards")
  async findCard(@Param('id') id: string): Promise<any> {
    return await this.deckService.findAll(id);
  }
  
  @ApiOperation({ summary: 'update Deck api', description: 'update deck info' })
  // Todo : set type value 
  @ApiCreatedResponse({ description: 'update Deck info' })
  @ApiParam({
    name: 'id',
    required: true,
    description: "deck ID",
  })
  @ApiBody({ type: UpdateDeckDto })
  @Patch(':id')
  async updateDeck(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
    return await this.deckService.updateDeck(id, updateDeckDto);
  }

  @ApiOperation({ summary: 'delete deck api', description: 'update deck info' })
  // Todo : set type value 
  @ApiCreatedResponse({ description: 'update Deck info' })
  @ApiParam({
    name: 'id',
    required: true,
    description: "deck ID",
  })
  @Delete(':id')
  async removeDeck(@Param('id') id: string) {
    return await this.deckService.removeDeck(id);
  }
}
