import { Injectable } from '@nestjs/common';
import { UpdateDeckDto } from './dto/UpdateDeckDto';
import { DeckRepository } from './DeckRepository';
import { DeckCategory } from './DeckConstant';
import { CardRepository } from '../card/CardRepository';

@Injectable()
export class DeckService {
  constructor(
    private readonly deckRepository: DeckRepository,
    private readonly cardRepository: CardRepository
  ) {}

  async create(name: string, userId: string, category: DeckCategory[]): Promise<string> {
    return await this.deckRepository.create(name, userId, category);
  }

  async findDeck(id: string): Promise<any> {
    return await this.deckRepository.findOne(id);
  }

  async findAllDeck(): Promise<any> {
    return await this.deckRepository.findAll();
  }

  async findByUserId(userId: string): Promise<any> {
    return await this.deckRepository.findByUserId(userId);
  }

  async updateDeck(id: string, updateDeckDto: UpdateDeckDto) {
    return await this.deckRepository.update(id);
  }

  async removeDeck(id: string) {
    return await this.deckRepository.remove(id);
  }

  async findAll(id: string): Promise<any> {
    return await this.cardRepository.findAll(id);
  }
}
