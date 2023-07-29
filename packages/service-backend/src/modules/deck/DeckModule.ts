import { Module } from '@nestjs/common';
import { CardModule } from '../card/CardModule';
import { DeckController } from './DeckController';
import { DeckRepository } from './DeckRepository';
import { DeckService } from './DeckService';

@Module({
  imports: [CardModule],
  controllers: [DeckController],
  providers: [DeckService, DeckRepository],
})
export class DeckModule {}
