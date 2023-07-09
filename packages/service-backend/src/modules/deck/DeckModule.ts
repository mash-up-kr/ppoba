import { Module } from '@nestjs/common';
import { DeckService } from './DeckService';
import { DeckController } from './DeckController';
import { DeckRepository } from './DeckRepository';

@Module({
  controllers: [DeckController],
  providers: [DeckService, DeckRepository],
})
export class DeckModule {}
