import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Card, Deck, User } from '@ppoba/types';
import { AuthUser, Public } from '../../core/decorators';
import { DeckService } from './DeckService';
import { CreateDeckDto } from './dto/CreateDeckDto';

@Controller('decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  async createDeck(
    @Body() createDeckDto: CreateDeckDto,
    @AuthUser() user: User
  ): Promise<{ result: { deck_id: string } }> {
    const result = await this.deckService.create(
      createDeckDto.name,
      user.id,
      createDeckDto.category
    );
    return { result: { deck_id: result } };
  }

  @Get('/me')
  async getDeckListOfMine(@AuthUser() user: User): Promise<{ result: Deck[] }> {
    const result = await this.deckService.findDeckListByUserId(user.id);
    return { result: result };
  }

  @Public
  @Get('/:id')
  async findDeck(@Param('id') id: string): Promise<{ result: Deck }> {
    const result = await this.deckService.findDeck(id);
    return { result: result };
  }

  @Public
  @Get()
  async findAllDeck(): Promise<{ result: Deck[] }> {
    const result = await this.deckService.findAllDeck();
    return { result: result };
  }

  @Public
  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<{ result: Deck[] }> {
    const result = await this.deckService.findDeckListByUserId(userId);
    return { result: result };
  }

  @Public
  @Get('/:id/cards')
  async findCardListByDeckId(@Param('id') deckId: string): Promise<{ result: Card[] }> {
    const result = await this.deckService.findCardListByDeckId(deckId);
    return { result: result };
  }

  // @ApiOperation({ summary: 'Update Deck api', description: 'update deck info' })
  // // Todo : Set schema
  // @ApiCreatedResponse({
  //   description: 'Updated Deck Information',
  //   schema: {
  //     example: {},
  //   },
  // })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'deck ID',
  // })
  // @ApiBody({ type: UpdateDeckDto })
  // @Patch(':id')
  // async updateDeck(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
  //   const result = await this.deckService.updateDeck(id, updateDeckDto);
  //   return { result: result };
  // }

  // @ApiOperation({ summary: 'Delete Deck api', description: 'delete deck info' })
  // // Todo : Set schema
  // @ApiCreatedResponse({ description: 'update Deck info' })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: 'deck ID',
  // })
  // @Delete(':id')
  // async removeDeck(@Param('id') id: string) {
  //   return await this.deckService.removeDeck(id);
  // }
}
