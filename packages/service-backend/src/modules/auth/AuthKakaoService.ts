import { Injectable, InternalServerErrorException } from '@nestjs/common';
import got from 'got';
import { env } from '../../core/env';
import { notNull } from '../../utils/notNull';
import { assert } from 'typia';
import * as Sentry from '@sentry/node';

@Injectable()
export class AuthKakaoService {
  async getLoginUrl(): Promise<string> {
    let response;
    try {
      throw new InternalServerErrorException('login url error for test');
      response = await got.get('https://kauth.kakao.com/oauth/authorize', {
        searchParams: {
          client_id: env.kakao.clientId,
          redirect_uri: env.kakao.redirectURI,
          response_type: 'code',
        },
        followRedirect: false,
      });
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        throw new InternalServerErrorException(`error: ${error.message}`);
      }
    }
    return notNull(response?.headers.location);
  }

  async getOAuthToken(code: string): Promise<{
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
  }> {
    const response = await got
      .post('https://kauth.kakao.com/oauth/token', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        form: {
          code,
          grant_type: 'authorization_code',
          client_id: env.kakao.clientId,
          redirect_uri: env.kakao.redirectURI,
        },
      })
      .json();

    return assert<{
      access_token: string;
      token_type: string;
      refresh_token: string;
      expires_in: number;
      scope: string;
      refresh_token_expires_in: number;
    }>(response);
  }

  async getUserInfo(accessToken: string): Promise<{
    id: number;
    connected_at: string;
    kakao_account: {
      has_age_range: boolean;
      age_range_needs_agreement: boolean;
      age_range: string; // '10~19';
      has_gender: boolean;
      gender_needs_agreement: boolean;
      gender: 'male' | 'female';
    };
  }> {
    const response = await got
      .get('https://kapi.kakao.com/v2/user/me', {
        searchParams: {
          property_keys: '["kakao_account.gender","kakao_account.age_range"]',
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .json();
    return assert<{
      id: number;
      connected_at: string;
      kakao_account: {
        has_age_range: boolean;
        age_range_needs_agreement: boolean;
        age_range: string; // '10~19';
        has_gender: boolean;
        gender_needs_agreement: boolean;
        gender: 'male' | 'female';
      };
    }>(response);
  }
}
