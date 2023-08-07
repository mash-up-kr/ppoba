import axios from 'axios';
import { authTokenRepository } from './AuthTokenRepository';

export function createApiClient({ auth }: { auth: boolean }) {
  const client = axios.create({
    baseURL: 'https://' + 'api.dev.ppoba.app' + '/v1',
  });

  if (auth) {
    client.interceptors.request.use(config => {
      const token = authTokenRepository.getTokenOrThrow();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  return client;
}
