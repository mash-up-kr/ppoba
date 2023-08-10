import { Prop, Schema } from '@nestjs/mongoose';
import { User } from '@ppoba/types';
import { HydratedDocument } from 'mongoose';
import { TimestampKey } from '../../types';

@Schema({ collection: 'User', timestamps: true })
export class UserCollection implements Omit<User, TimestampKey> {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true })
  gender: 'male' | 'female';
}

export type UserDocument = HydratedDocument<UserCollection>;
