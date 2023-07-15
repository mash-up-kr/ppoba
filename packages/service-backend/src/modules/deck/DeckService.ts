import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/CreateDeckDto';
import { UpdateDeckDto } from './dto/UpdateDeckDto';
import { DeckRepository } from './DeckRepository';
import { DeckCategory } from './DeckConstant';

@Injectable()
export class DeckService {
  constructor(private readonly deckRepository: DeckRepository) {}

  async create(name: string, userId: string, category: DeckCategory[]): Promise<string> {
    return await this.deckRepository.create(name, userId, category);
  }

  async findDeck(id: string): Promise<any> {
    return await this.deckRepository.findOne(id);
  }

  async updateDeck(id: string, updateDeckDto: UpdateDeckDto) {
    return await this.deckRepository.update(id);
  }

  async removeDeck(id: string) {
    return await this.deckRepository.remove(id);
  }
}
