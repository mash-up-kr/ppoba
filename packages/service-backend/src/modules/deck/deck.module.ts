import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';

@Module({
  controllers: [DeckController],
  providers: [DeckService]
})
export class DeckModule {}
