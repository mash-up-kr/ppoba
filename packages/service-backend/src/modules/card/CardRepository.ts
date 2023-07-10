import { Injectable, NotFoundException } from '@nestjs/common';
import { assert } from 'typia';
import { InjectModel, Model, Card } from '../../core/database';

@Injectable()
export class CardRepository {
    constructor(
        @InjectModel.Card
        private readonly cardModel: Model['Card']
      ) {}
      
    async create(cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>){
        const cardItem = await this.cardModel.create({
            id: cardDto.id,
            content: cardDto.content,
            // 여기 수정 
            deletedAt: new Date()
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

    async delete(card: Card){
      console.log(card)
      const deletedCard = await this.cardModel.findOneAndDelete({ id: card.id });
      return deletedCard;
    }
    
}