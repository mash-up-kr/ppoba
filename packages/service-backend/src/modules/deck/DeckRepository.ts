import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '../../core/database';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { DeckDocument } from '../../core/database/Deck';
import { DeckCategory } from './DeckConstant';
import * as Sentry from '@sentry/node';
import { Deck } from '@ppoba/types';
import { assert } from 'typia';
import { notNull } from '../../utils/notNull';
@Injectable()
export class DeckRepository {
  constructor(@InjectModel.Deck private readonly deckModel: SoftDeleteModel<DeckDocument>) {}

  async create(name: string, userId: string, category: DeckCategory[]): Promise<string> {
    let deckId;
    try {
      const deck = await this.deckModel.create({
        name,
        userId,
        category,
      });
      deckId = deck.id;
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        throw new InternalServerErrorException(`error: ${error.message}`);
      }
    }
    return deckId;
  }
  async findOne(id: string): Promise<Deck> {
    let deck;
    try {
      deck = await this.deckModel.findOne({ id });
      if (!deck) {
        throw new NotFoundException(`Deck with id ${id} not found`);
      }
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        throw new InternalServerErrorException(`error: ${error.message}`);
      }
    }
    return assert<Deck>(notNull(deck).toJSON());
  }

  async findAll(): Promise<Deck[]> {
    let deckList;
    try {
      deckList = await this.deckModel.find().exec();
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) throw new InternalServerErrorException(`error: ${error.message}`);
    }
    return assert<Deck[]>(notNull(deckList).map(deck => deck.toJSON()));
  }

  async findByUserId(userId: string): Promise<Deck[] | []> {
    let deckList;
    try {
      deckList = await this.deckModel.find({ userId: userId }).exec();
      if (deckList.length === 0) return [];
    } catch (error) {
      Sentry.captureException(error);
      throw new InternalServerErrorException(`error: ${error}`);
    }
    return assert<Deck[]>(notNull(deckList).map(deck => deck.toJSON()));
  }

  // async update(id: string) {
  //   return `This action updates a #${id} deck`;
  // }

  // async remove(id: string) {
  //   return `This action removes a #${id} deck`;
  // }
}
