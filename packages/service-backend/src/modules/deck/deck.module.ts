import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';
import { DeckRepository } from './deck.repository';

@Module({
  controllers: [DeckController],
  providers: [DeckService, DeckRepository],
})
export class DeckModule {}
