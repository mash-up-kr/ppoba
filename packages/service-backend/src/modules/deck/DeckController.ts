import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeckService } from './DeckService';
import { CreateDeckDto } from './dto/CreateDeckDto';
import { UpdateDeckDto } from './dto/UpdateDeckDto';
import { Deck, Card } from '../../core/database';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('decks')
@Controller('decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @ApiOperation({ summary: 'Deck Creation api', description: 'upload a deck of cards' })
  @ApiCreatedResponse({
    description: 'Deck ID', schema: {
      example: {
        "result" : {
          "deck_id": "7b0cf169-2d3e-4cd9-94ca-a37f4b1a5e52"
        }
      }
    }
  })
  @ApiBody({ type: CreateDeckDto })
  @Post()
  async createDeck(@Body() createDeckDto: CreateDeckDto): Promise<{ deck_id: string }> {
    const result = await this.deckService.create(createDeckDto.name, createDeckDto.userId, createDeckDto.category);
    return { deck_id: result };
  }

  @ApiOperation({ summary: 'Get Deck api', description: 'Get card information by deck id' })
  @ApiCreatedResponse({
    description: 'Deck Information', schema: {
      example: {
        "result": {
          "_id": "64b7a1683737e071de83b768",
          "name": "My Deck",
          // Todo check 
          "cardIds": [],
          "category": [
              "����"
          ],
          "userId": "12345",
          "isDeleted": false,
          "deletedAt": null,
          "id": "7b0cf169-2d3e-4cd9-94ca-a37f4b1a5e52",
          "createdAt": "2023-07-19T08:40:08.038Z",
          "updatedAt": "2023-07-19T08:40:08.038Z",
          "__v": 0
      }
    }
  }})
  @ApiParam({
    name: 'id',
    required: true,
    description: "deck ID",
  })
  @Get('/:id')
  async findDeck(@Param('id') id: string): Promise<{ result: Deck | null }> {
    const result = await this.deckService.findDeck(id);
    return { result: result };
  }

  @ApiOperation({ summary: 'Get List of Cards in Deck', description: 'Get card information by deck id' })
  @ApiCreatedResponse({
    description: 'List of Cards in Deck', schema: {
      example: {
        "result": [
          {
              "_id": "64b7a4b63737e071de83b76b",
              "content": "Card 1 content",
              "deckId": "7b0cf169-2d3e-4cd9-94ca-a37f4b1a5e52",
              "deletedAt": null,
              "isDeleted": false,
              "id": "9c29e720-bed6-48ca-8c75-0b50613e6f15",
              "createdAt": "2023-07-19T08:54:14.857Z",
              "updatedAt": "2023-07-19T08:54:14.857Z",
              "__v": 0
          },
          {
              "_id": "64b7a4b63737e071de83b76c",
              "content": "Card 2 content",
              "deckId": "7b0cf169-2d3e-4cd9-94ca-a37f4b1a5e52",
              "deletedAt": null,
              "isDeleted": false,
              "id": "1ad725d4-7894-4b1c-8b14-52f0604c5a06",
              "createdAt": "2023-07-19T08:54:14.858Z",
              "updatedAt": "2023-07-19T08:54:14.858Z",
              "__v": 0
          }
        ]
      }
  }})
  @ApiParam({
    name: 'id',
    required: true,
    description: "deck ID",
  })
  @Get(":id/cards")
  async findCard(@Param('id') id: string): Promise<{ result : Card[] | null }> {
    const result = await this.deckService.findAll(id);
    return { result: result };
  }
  
  @ApiOperation({ summary: 'Update Deck api', description: 'update deck info' })
  // Todo : Set schema 
  @ApiCreatedResponse({
    description: 'Updated Deck Information', schema: {
      example: {
      }
    }
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: "deck ID",
  })
  @ApiBody({ type: UpdateDeckDto })
  @Patch(':id')
  async updateDeck(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
    const result = await this.deckService.updateDeck(id, updateDeckDto);
    return { result: result };
  }

  @ApiOperation({ summary: 'Delete Deck api', description: 'delete deck info' })
  // Todo : Set schema 
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
