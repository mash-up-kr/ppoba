import { JSON_APIS } from './apiResponseHandler';
import { createApiClient } from './clientFactory';
export { authTokenRepository, AuthTokenRepository, AuthenticationRequiredError } from './AuthTokenRepository';

const client = {
  public: createApiClient({ auth: false }),
  session: createApiClient({ auth: true }),
};

const auth = JSON_APIS({
  /**
   * TODO: API에 대한 한줄 주석
   */
  verify: () => client.session.get<{}>('auth/verify'),
  getLoginUrl: () => client.public.get<{ loginUrl: string }>('auth/kakao/login'),
  getAuthToken: ({ code }: { code: string }) => client.public.get<{ token: string }>(`auth/kakao/token?code=${code}`),
});

const card = JSON_APIS({
  // TODO
});

const deck = JSON_APIS({
  // TODO
});

export const api = {
  auth,
  card,
  deck,
};
