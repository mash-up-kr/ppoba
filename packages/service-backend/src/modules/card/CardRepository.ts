import { Injectable } from '@nestjs/common';
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
          });
          console.log(cardItem.toJSON());
          return assert<Card>(cardItem.toJSON());
    }
}