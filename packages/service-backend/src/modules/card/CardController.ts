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
    async deleteCard(@Param('id') id: string): Promise<object> {
        console.log(id);
        await this.cardService.deleteCard(id);
        return { message: '카드가 삭제되었습니다.' };
    }
    
    @Patch(':id')
    async updateCard(@Param('id') id: string, @Body() cardDto: Omit<Card, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
        return this.cardService.updateCard(id, cardDto);
    }
}