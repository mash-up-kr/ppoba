import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { assert } from 'typia';
import { CardDocument, InjectModel } from '../../core/database';
import { CardList } from './dto/createCardDto';
import * as Sentry from '@sentry/node';
import { Card } from '@ppoba/types';

@Injectable()
export class CardRepository {
  constructor(
    @InjectModel.Card
    private readonly cardModel: SoftDeleteModel<CardDocument>
  ) {}

  async create(cardList: CardList[], deckId: string): Promise<boolean> {
    try {
      await Promise.all(
        cardList.map(async (card, index) => {
          try {
            await this.cardModel.create({ content: card.content, deckId: deckId });
          } catch (error) {
            Sentry.captureException(error);
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
    try {
      const cardItem = await this.cardModel.findOne({ id });
      if (cardItem) {
        return assert<Card>(cardItem.toJSON());
      }
    } catch (error) {
      if (error instanceof Error) {
        Sentry.captureException(error);
        throw new InternalServerErrorException(`error: ${error.message}`);
      }
    }
    return null;
  }

  async delete(card: Card): Promise<boolean> {
    let result;
    try {
      result = await this.cardModel.softDelete({ id: card.id });
      if (result.deleted === 0) {
        throw new NotFoundException(`card id: ${card.id} not found`);
      }
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        throw new InternalServerErrorException(`error: ${error.message}`);
      }
    }
    return true;
  }

  async update(id: string, card: Card): Promise<boolean> {
    try {
      const updateCard = await this.cardModel.updateOne(
        { id: id },
        { $set: { content: card.content } }
      );

      if (updateCard.modifiedCount === 0) {
        throw new NotFoundException(`card id: ${id} not found`);
      }
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        throw new InternalServerErrorException(`error: ${error.message}`);
      }
    }
    return true;
  }

  async findAll(deckId: string): Promise<Card[] | []> {
    try {
      const cardItems = await this.cardModel.find({ deckId }).exec();
      return cardItems.map(cardItem => assert<Card>(cardItem.toJSON()));
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        throw new InternalServerErrorException(`error: ${error.message}`);
      }
    }
    return [];
  }
}
