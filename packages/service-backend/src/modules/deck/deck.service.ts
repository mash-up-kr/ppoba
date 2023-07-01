import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { DeckRepository } from './deck.repository';

@Injectable()
export class DeckService {
  constructor(private readonly deckRepository: DeckRepository;) {
  }
  async create(createDeckDto: CreateDeckDto) {
    return await this.deckRepository.create();
  }

  async findDeck(id: string) {
    return await this.deckRepository.findOne(id);
  }

  async updateDeck(id: string, updateDeckDto: UpdateDeckDto) {
    return await this.deckRepository.update(id);
  }

  async removeDeck(id: string) {
    return await this.deckRepository.remove(id);
  }
}
