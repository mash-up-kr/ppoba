import { Prop, Schema, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type Card = {
  id: string;

  content: string;

  deckId: string;

  createdAt: Date;

  deletedAt: Date;

  updatedAt: Date;
};

const options: SchemaOptions = {
  timestamps: true,
  collection: 'Card',
};

export type TimestampKey = 'createdAt' | 'updatedAt';

@Schema(options)
export class CardCollection implements Omit<Card, TimestampKey> {
  @Prop({ default: uuidv4, unique: true })
  id: string;

  @Prop({ required: true, unique: false })
  content: string;

  @Prop({ required: true, unique: false })
  deckId: string;

  @Prop({ unique: false })
  deletedAt: Date;
}

export type CardDocument = HydratedDocument<CardCollection>;
