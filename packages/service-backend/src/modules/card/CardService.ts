import { Injectable } from '@nestjs/common';
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
}
