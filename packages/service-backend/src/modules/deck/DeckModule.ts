import { Module, forwardRef } from '@nestjs/common';
import { CardModule } from '../card/CardModule';
import { DeckController } from './DeckController';
import { DeckRepository } from './DeckRepository';
import { DeckService } from './DeckService';

@Module({
  imports: [forwardRef(() => CardModule)],
  controllers: [DeckController],
  providers: [DeckService, DeckRepository],
  exports: [DeckRepository],
})
export class DeckModule {}
