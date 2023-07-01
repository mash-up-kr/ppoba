import { Prop, Schema, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Card = {
    // todo : AutoCreate
    id: string;
  
    content: string;
  
    createdAt: Date;
    
    deletedAt: Date;
    
    updatedAt: Date;
};
  
const options: SchemaOptions = {
    timestamps: true,
    collection: 'Card',
  };
  
export type TimestampKey = 'createdAt' | 'deletedAt' | 'updatedAt';
  
@Schema(options)
export class CardCollection implements Omit<Card, TimestampKey> {
    @Prop({unique: true, required: true})
    id: string;
    
    @Prop({unique: true, required: true})
    content: string;
}

export type CardDocument = HydratedDocument<CardCollection>;
