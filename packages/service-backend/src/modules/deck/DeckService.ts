import { Injectable } from '@nestjs/common';
import { DeckRepository } from './DeckRepository';
import { DeckCategory } from './DeckConstant';
import { CardRepository } from '../card/CardRepository';
import { Card, Deck } from '@ppoba/types';

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

  async findAllDeck(): Promise<Deck[]> {
    return await this.deckRepository.findAll();
  }

  async findDeckListByUserId(userId: string): Promise<Deck[] | []> {
    return await this.deckRepository.findByUserId(userId);
  }

  async findAllCardsByDeckId(deckId: string): Promise<Card[] | []> {
    return await this.cardRepository.findAll(deckId);
  }

  async findCardListByDeckId(id: string): Promise<any> {
    return await this.cardRepository.findAll(id);
  }

  // async updateDeck(id: string, updateDeckDto: UpdateDeckDto): Promise<any> {
  //   return await this.deckRepository.update(id);
  // }

  // async removeDeck(id: string): Promise<any> {
  //   return await this.deckRepository.remove(id);
  // }
}
