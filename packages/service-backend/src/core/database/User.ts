import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TimestampKey } from '../../types';

/**
 * TODO: common으로
 */
export type User = {
  id: string;

  name: string;

  // '10-19' | '20-29' | '30-39' | ...
  age: string;

  gender: 'male' | 'female';

  createdAt: Date;

  updatedAt: Date;
};

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
