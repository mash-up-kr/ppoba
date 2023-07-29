import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '../../core/database';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { DeckDocument } from '../../core/database/Deck';
import { DeckCategory } from './DeckConstant';

@Injectable()
export class DeckRepository {
  constructor(@InjectModel.Deck private readonly deckModel: SoftDeleteModel<DeckDocument>) {}

  async create(name: string, userId: string, category: DeckCategory[]): Promise<string> {
    try {
      const deck = await this.deckModel.create({
        name,
        userId,
        category,
      });
      return deck.id;
    } catch (error) {
      throw new InternalServerErrorException(`error: ${error}`);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const deck = await this.deckModel.findOne({ id });

      if (!deck) {
        throw new NotFoundException(`Deck with id ${id} not found`);
      }

      return deck;
    } catch (error) {
      throw new InternalServerErrorException(`error: ${error}`);
    }
  }

  async findAll(): Promise<any> {
    try {
      const deckList = await this.deckModel.find().exec();

      return deckList;
    } catch (error) {
      throw new InternalServerErrorException(`error: ${error}`);
    }
  }

  async findByUserId(userId: string): Promise<any> {
    try {
      const deckList = await this.deckModel.find({ userId: userId }).exec();

      return deckList;
    } catch (error) {
      throw new InternalServerErrorException(`error: ${error}`);
    }
  }

  async update(id: string) {
    return `This action updates a #${id} deck`;
  }

  async remove(id: string) {
    return `This action removes a #${id} deck`;
  }
}
