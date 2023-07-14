import { Injectable, NotFoundException } from '@nestjs/common';
import { assert } from 'typia';
import { InjectModel, Card, CardDocument } from '../../core/database';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'

@Injectable()
export class CardRepository {
    constructor(
        @InjectModel.Card
        private readonly cardModel: SoftDeleteModel<CardDocument>
      ) {}
      
    async create(content: string){
        const cardItem = await this.cardModel.create({
            content: content,
            deletedAt: null
          });
          console.log(cardItem.toJSON());
          return assert<Card>(cardItem.toJSON());
    }
    
    async findById(id: string): Promise<Card | null> {
      const cardItem = await this.cardModel.findOne({ id });
      if (cardItem) {
        return assert<Card>(cardItem.toJSON());
      } else {
        return null;
      }
    }

    async delete(card: Card): Promise<Object>{
      const deletedCard = await this.cardModel.softDelete({ id: card.id });
      return deletedCard;
    }
    
    async update(id: string, card: Card): Promise<Object> {
      const updateCard = await this.cardModel.updateOne(
        { id: id },
        { $set: { content: card.content } }
      );

      return updateCard;
    }
}
