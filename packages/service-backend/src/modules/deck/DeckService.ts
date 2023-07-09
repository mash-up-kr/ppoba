import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/CreateDeckDto';
import { UpdateDeckDto } from './dto/UpdateDeckDto';
import { DeckRepository } from './DeckRepository';

@Injectable()
export class DeckService {
  constructor(private readonly deckRepository: DeckRepository) {}

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
