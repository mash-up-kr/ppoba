import { Injectable } from '@nestjs/common';
import { assert } from 'typia';
import { notNull } from '../../utils/notNull';
import { InjectModel, Model, User } from '../../core/database';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel.User
    private readonly userModel: Model['User']
  ) {}

  async create(userDto: Omit<User, 'createdAt' | 'updatedAt'>) {
    const userItem = await this.userModel.create({
      id: userDto.id,
      name: userDto.name,
      gender: userDto.gender,
      age: userDto.age,
    });
    return assert<User>(userItem.toJSON());
  }

  async getById(id: number): Promise<User | null> {
    const userItem = await this.userModel.findOne({ id });
    if (userItem) {
      return assert<User>(userItem.toJSON());
    } else {
      return null;
    }
  }

  async getByIdOrThrow(id: number): Promise<User | null> {
    return notNull(await this.getById(id));
  }
}
