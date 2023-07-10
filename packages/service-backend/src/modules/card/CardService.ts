import { Injectable, NotFoundException } from '@nestjs/common';
import { CardRepository } from './CardRepository';

@Injectable()
export class CardService {
    constructor(
        private readonly cardRepository: CardRepository
    ){}
    
    async create(params: { id : string, content: string }){
        // TODO auto increment로
        return await this.cardRepository.create({
        id: params.id,
        content: params.id
      });
    }
    
    async deleteCard(id: string) {
        const card = await this.cardRepository.findById(id);
        
        if (!card) {
          throw new NotFoundException('카드를 찾을 수 없습니다.');
        }
        
        return this.cardRepository.delete(card);
      }
      
}
