import { HydratedDocument } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { TimestampKey } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { DeckCategory } from '../../modules/deck/DeckConstant';

export type Deck = {
  id: string;
  name: string;
  // TODO category m:n relation
  category: DeckCategory[];
  // TODO card 1:n relation and aggregate card count
  cardIds: string[];
  // TODO card 1:n relation and aggregate card count
  totalCardCount: number;
  // TODO user m:n relation fk
  userId: string;
};

@Schema({ collection: 'Deck', timestamps: true })
export class DeckCollection implements Omit<Deck, TimestampKey> {
  @Prop({ default: uuidv4, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ optional: true })
  cardIds: string[];

  @Prop({ optional: true })
  category: DeckCategory[];

  @Prop({ optional: true })
  totalCardCount: number;

  @Prop({ required: true })
  userId: string;
}

export type DeckDocument = HydratedDocument<DeckCollection>;
