import { Injectable } from '@nestjs/common';
import { UpdateDeckDto } from './dto/UpdateDeckDto';
import { DeckRepository } from './DeckRepository';
import { DeckCategory } from './DeckConstant';
import { CardRepository } from '../card/CardRepository'
import { Deck } from '../../core/database';

@Injectable()
export class DeckService {
  constructor(
    private readonly deckRepository: DeckRepository,
    private readonly cardRepository: CardRepository
    ) {}

  async create(name: string, userId: string, category: DeckCategory[]): Promise<string> {
    return await this.deckRepository.create(name, userId, category);
  }

  async findDeck(id: string): Promise<Deck | null> {
    return await this.deckRepository.findOne(id);
  }

  async updateDeck(id: string, updateDeckDto: UpdateDeckDto) {
    return await this.deckRepository.update(id);
  }

  async removeDeck(id: string) {
    return await this.deckRepository.remove(id);
  }
  
  async findAll(id: string){
    return await this.cardRepository.findAll(id);
  }
}
