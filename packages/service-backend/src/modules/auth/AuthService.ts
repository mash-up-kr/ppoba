import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { User } from '../../core/database';
import { UserRepository } from '../user/UserRepository';
import { AuthKakaoService } from './AuthKakaoService';
import { JwtService } from './JwtService';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly authKakaoService: AuthKakaoService
  ) {}

  async authenticate(code: string) {
    const tokens = await this.authKakaoService.getOAuthToken(code);
    const userInfo = await this.authKakaoService.getUserInfo(tokens.access_token);

    let user: User | null = await this.userRepository.getById(userInfo.id);

    if (user == null) {
      user = await this.signUp({
        id: String(userInfo.id),
        age: userInfo.kakao_account.age_range,
        gender: userInfo.kakao_account.gender,
      });
    }

    return await this.signIn(user);
  }

  async signIn(user: User) {
    const token = await this.jwtService.encode(user);
    return { token };
  }

  async signUp(params: { id: string; age: string; gender: string }) {
    // TODO auto increment로
    return await this.userRepository.create({
      name: '익명' + nanoid(),
      id: params.id,
      age: params.age,
      // TODO add typeguard
      gender: params.gender as 'male' | 'female',
    });
  }
}
