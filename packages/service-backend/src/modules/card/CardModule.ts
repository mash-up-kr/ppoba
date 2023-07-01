import { Module } from '@nestjs/common';
import { CardController } from './CardController';
import { CardService } from './CardService';
import { CardRepository } from './CardRepository';

@Module({
  controllers: [CardController],
  providers: [CardService, CardRepository]
})
export class CardModule {}
