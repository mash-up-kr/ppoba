import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { stageValue } from '../../core/env';

export type User = {
  id: number;

  name: string;

  birthday: string;

  gender: 'male' | 'female';

  kakaoToken: string;

  createdAt: string;

  updatedAt: string;
};

export class UserItem extends Item implements User {
  id: number;

  name: string;

  birthday: string;

  gender: 'male' | 'female';

  kakaoToken: string;

  createdAt: string;

  updatedAt: string;
}

export const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: Number,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    gender: {
      type: String, // 'male' | 'female'
      required: true,
    },
    kakaoToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = dynamoose.model<UserItem>(stageValue('User'), UserSchema);
