import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { assert } from 'typia';
import { InjectModel, Card, CardDocument } from '../../core/database';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class CardRepository {
  constructor(
    @InjectModel.Card
    private readonly cardModel: SoftDeleteModel<CardDocument>
  ) {}

  async create(
    cardDtoList: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>[]
  ): Promise<boolean> {
    try {
      await Promise.all(
        cardDtoList.map(async (cardDto, index) => {
          try {
            await this.cardModel.create({ content: cardDto.content, deckId: cardDto.deckId });
          } catch (error) {
            throw new InternalServerErrorException(
              `error create card row ${index} \n reason is : error: ${error}`
            );
          }
        })
      );
      return true;
    } catch (error) {
      throw new InternalServerErrorException(`error: ${error}`);
    }
  }

  async findById(id: string): Promise<Card | null> {
    const cardItem = await this.cardModel.findOne({ id });
    if (cardItem) {
      return assert<Card>(cardItem.toJSON());
    } else {
      return null;
    }
  }

  async delete(card: Card): Promise<object> {
    const deletedCard = await this.cardModel.softDelete({ id: card.id });
    return deletedCard;
  }

  async update(id: string, card: Card): Promise<object> {
    const updateCard = await this.cardModel.updateOne(
      { id: id },
      { $set: { content: card.content } }
    );

    return updateCard;
  }
}
