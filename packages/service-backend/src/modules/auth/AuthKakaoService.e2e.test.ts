import { AuthKakaoService } from './AuthKakaoService';
import express from 'express';
import open from 'open';

jest.setTimeout(1_000_000);

describe('AuthKakaoService', () => {
  const service = new AuthKakaoService();
  it('카카오 로그인 테스트', async () => {
    const loginUrl = await service.getLoginUrl();
    open(loginUrl);
    const code = await receiveCode();
    const { access_token: accessToken } = await service.getOAuthToken(code);
    const userInfo = await service.getUserInfo(accessToken);
    console.log(userInfo);
  });
});

async function receiveCode() {
  return new Promise<string>(resolve => {
    const app = express();
    app.get('/oauth', (req, res) => {
      res.send('success');
      resolve((req.query as any).code);
      server.close();
    });

    const server = app.listen(3012);
    server.unref();
  });
}
