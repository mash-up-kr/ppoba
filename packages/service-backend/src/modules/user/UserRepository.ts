import { Injectable } from '@nestjs/common';
import { assert } from 'typia';
import { notNull } from '../../utils/notNull';
import { InjectModel, Model } from '../../core/database';
import * as Sentry from '@sentry/node';
import { User } from '@ppoba/types';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel.User
    private readonly userModel: Model['User']
  ) {}

  async create(userDto: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
    let user;
    try {
      user = await this.userModel.create({
        id: userDto.id,
        name: userDto.name,
        gender: userDto.gender,
        age: userDto.age,
      });
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return assert<User>(notNull(user?.toJSON()));
  }

  async getById(id: number): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ id });
      if (user) {
        return assert<User>(notNull(user)?.toJSON());
      }
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return null;
  }
}
