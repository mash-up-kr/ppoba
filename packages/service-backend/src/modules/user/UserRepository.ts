import { Injectable } from '@nestjs/common';
import { assert } from 'typia';
import { IdGeneratorService } from '../id-generator/IdGeneratorService';
import { User, UserModel } from './UserEntity';
import { notNull } from '../../utils/notNull';

@Injectable()
export class UserRepository {
  constructor(private readonly idGeneratorService: IdGeneratorService) {}

  async create(userDto: Omit<User, 'createdAt' | 'updatedAt'>) {
    const { cursor: id } = await this.idGeneratorService.generate('User');
    const userItem = await UserModel.create({
      id,
      name: userDto.name,
      gender: userDto.gender,
      birthday: userDto.birthday,
      kakaoToken: userDto.kakaoToken,
    });
    return assert<User>(userItem.toJSON());
  }

  async getById(id: number): Promise<User | null> {
    const userItem = await UserModel.get({ id });
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
