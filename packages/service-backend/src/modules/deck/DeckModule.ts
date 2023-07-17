import { Module } from '@nestjs/common';
import { DeckService } from './DeckService';
import { DeckController } from './DeckController';
import { DeckRepository } from './DeckRepository';
import { CardRepository } from '../card/CardRepository'

@Module({
  controllers: [DeckController],
  providers: [DeckService, DeckRepository, CardRepository],
})
export class DeckModule {}
