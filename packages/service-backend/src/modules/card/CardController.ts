import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CardService } from './CardService';
import { Card } from '../../core/database';

@Controller('cards')
export class CardController {
    constructor(
        private readonly cardService: CardService
    ) {}
    
    @Get()
    async getTestCard(){
        return "card";
    }
    
    @Post()
    async onCreateCard(@Body() cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>){
        return this.cardService.create(cardDto.content);
    }
    
    @Delete(':id')
    async deleteCard(@Param('id') id: string): Promise<Object> {
        console.log(id);
        await this.cardService.deleteCard(id);
        return { message: '카드가 삭제되었습니다.' };
    }
    
    @Patch(':id')
    // TODO : updateDto 적용 
    async updateCard(@Param('id') id: string, cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
        return this.cardService.updateCard(id, cardDto);
    }
}