import { Module, forwardRef } from '@nestjs/common';
import { CardController } from './CardController';
import { CardService } from './CardService';
import { CardRepository } from './CardRepository';
import { DeckModule } from '../deck/DeckModule';

@Module({
  imports: [forwardRef(() => DeckModule)],
  controllers: [CardController],
  providers: [CardService, CardRepository],
  exports: [CardRepository],
})
export class CardModule {}
