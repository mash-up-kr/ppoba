'use client';

export class AuthTokenRepository {
  private readonly authTokenKey = '@@@ppobaAuthToken';
  private authToken: string | null;

  constructor() {
    this.load();
  }

  load() {
    if (typeof window === 'undefined') {
      this.authToken = null;
    } else {
      this.authToken = window.localStorage.getItem(this.authTokenKey);
    }
  }

  getToken() {
    return this.authToken;
  }

  getTokenOrThrow() {
    if (this.authToken == null) {
      throw new AuthenticationRequiredError();
    }
    return this.authToken;
  }

  clear() {
    this.authToken = null;
    window.localStorage.removeItem(this.authTokenKey);
  }

  setToken(token: string) {
    this.authToken = token;
    window.localStorage.setItem(this.authTokenKey, token);
  }
}

export class AuthenticationRequiredError extends Error {
  constructor() {
    super(`로그인이 필요한 서비스입니다`);
  }
}

export const authTokenRepository = new AuthTokenRepository();
