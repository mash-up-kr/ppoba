import { Injectable, NotFoundException } from '@nestjs/common';
import { CardRepository } from './CardRepository';
import { Card } from '../../core/database';
import { CreateCardDto, CardList } from './dto/createCardDto';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async create(cardList: CardList[], deckId: string): Promise<boolean> {
    return await this.cardRepository.create(cardList, deckId);
  }

  async deleteCard(id: string): Promise<object> {
    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new NotFoundException('카드를 찾을 수 없습니다.');
    }

    return this.cardRepository.delete(card);
  }

  async updateCard(
    id: string,
    cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>
  ): Promise<object> {
    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new NotFoundException('카드를 찾을 수 없습니다.');
    }

    Object.assign(card, cardDto);

    return this.cardRepository.update(id, card);
  }
}
