import { JSON_APIS } from './apiResponseHandler';
import { createApiClient } from './clientFactory';
import { CreateCardDto, CreateDeckDto, Card, Deck } from '@ppoba/types';
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

/* card api */
const card = JSON_APIS({
  /* card Creations */
  createCard: ({ createCardDto }: { createCardDto: CreateCardDto }) =>
    client.session.post<Promise<{ result: boolean }>>('cards', createCardDto),
  /* delete card by id */
  deleteCard: ({ id }: { id: string }) => client.session.delete<Promise<{ result: boolean }>>(`cards/id=${id}`),
});

/* deck api */
const deck = JSON_APIS({
  /* deck Creations: Upload a deck of cards */
  createDeck: ({ createDeckDto }: { createDeckDto: CreateDeckDto }) =>
    client.session.post<Promise<{ deck_id: string }>>('decks', createDeckDto),
  /* get Deck: Get card information by deck id */
  getDeck: ({ id }: { id: string }) => client.session.get<Promise<{ result: Deck | null }>>(`decks/id=${id}`),
  /* get List of Cards in deck: Get card information by deck id */
  getCards: ({ id }: { id: string }) => client.session.get<Promise<{ result: Card[] | null }>>(`decks/id=${id}/cards`),
});

export const api = {
  auth,
  card,
  deck,
};
