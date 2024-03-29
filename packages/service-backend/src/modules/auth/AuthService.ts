import { Injectable } from '@nestjs/common';
import { User } from '@ppoba/types';
import { nanoid } from 'nanoid';
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

  async decode(token: string): Promise<User> {
    const user = await this.jwtService.decode(token);
    return user;
  }

  async authenticate(code: string): Promise<{ token: string }> {
    const tokens = await this.authKakaoService.getOAuthToken(code);
    const userInfo = await this.authKakaoService.getUserInfo(tokens.access_token);

    let user: User | null = await this.userRepository.getById(userInfo.id);

    if (!user) {
      user = await this.signUp({
        id: String(userInfo.id),
        age: userInfo.kakao_account.age_range ?? '20-29',
        gender: userInfo.kakao_account.gender ?? 'unknown',
      });
    }

    return await this.signIn(user);
  }

  private async signIn(user: User) {
    const token = await this.jwtService.encode(user);
    return { token };
  }

  private async signUp(params: { id: string; age: string; gender: string }) {
    return await this.userRepository.create({
      name: '익명' + nanoid(),
      id: params.id,
      age: params.age,
      // TODO add typeguard
      gender: params.gender as User['gender'],
    });
  }
}
