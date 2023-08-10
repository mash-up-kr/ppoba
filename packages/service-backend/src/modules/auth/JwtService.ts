import { Injectable } from '@nestjs/common';
import { env } from '../../core/env';
import jwt from 'jsonwebtoken';
import { assert } from 'typia';
import { TimestampKey } from '../../types';
import { User } from '@ppoba/types';

@Injectable()
export class JwtService {
  private readonly privateKey = env.jwtKey;

  async encode(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        this.encodeUser(user),
        this.privateKey,
        {
          issuer: 'ppoba',
          expiresIn: 365 * 24 * 60 * 60,
        },
        function (error, token) {
          if (error) {
            reject(error);
          } else if (token == null) {
            reject(new Error('JWT sign failed'));
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  async decode(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.privateKey, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        try {
          resolve(assert<User>(this.decodeUser(decoded)));
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private encodeUser(user: User): Omit<User, TimestampKey> & { [K in TimestampKey]: number } {
    return {
      id: user.id,
      age: user.age,
      name: user.name,
      gender: user.gender,
      createdAt: Number(user),
      updatedAt: Number(user),
    };
  }

  private decodeUser(user: any): User {
    return {
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };
  }
}
