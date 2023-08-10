import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from '../../core/database';
import { CardRepository } from './CardRepository';
import { CardList } from './dto/createCardDto';
import { DeckRepository } from '../deck/DeckRepository';

@Injectable()
export class CardService {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly deckRepository: DeckRepository
  ) {}

  async create(cardList: CardList[], deckId: string): Promise<boolean> {
    const totalCardCount = cardList.length;
    await this.cardRepository.create(cardList, deckId);
    return await this.deckRepository.updateDeckTotalCardCount(deckId, totalCardCount);
  }

  async deleteCard(id: string): Promise<boolean> {
    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new NotFoundException('카드를 찾을 수 없습니다.');
    }

    return this.cardRepository.delete(card);
  }

  async updateCard(
    id: string,
    cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>
  ): Promise<boolean> {
    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new NotFoundException('카드를 찾을 수 없습니다.');
    }

    Object.assign(card, cardDto);

    return this.cardRepository.update(id, card);
  }
}
