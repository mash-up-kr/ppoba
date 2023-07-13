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
      
    async create(cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>){
        const cardItem = await this.cardModel.create({
            id: cardDto.id,
            content: cardDto.content,
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
    
    async save(id: string, card: Card) {
      
      const cardItem = await this.cardModel.findByIdAndUpdate(
        id,
        {
          content: card.content, // 업데이트할 필드 추가
          deletedAt: card.deletedAt, // 업데이트할 필드 추가
        },
        { new: true } // 업데이트 후의 카드 객체 반환 설정
      );
    
      if (!cardItem) {
        throw new NotFoundException('카드를 찾을 수 없습니다.');
      }
    
      console.log(cardItem.toJSON());
      return assert<Card>(cardItem.toJSON());
    }
}