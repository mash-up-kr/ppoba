import { Card, CreateCardDto, CreateDeckDto, Deck, User } from '@ppoba/types';
import { JSON_APIS } from './apiResponseHandler';
import { createApiClient } from './clientFactory';
export { AuthenticationRequiredError, authTokenRepository, AuthTokenRepository } from './AuthTokenRepository';

const client = {
  public: createApiClient({ auth: false }),
  session: createApiClient({ auth: true }),
};

const auth = JSON_APIS({
  /** 내 정보를 가져옵니다. */
  getMe: () => client.session.get<User>('auth/me'),
  /** Authentication 헤더로 JWT 토큰을 검증합니다. */
  verify: () => client.session.get<{}>('auth/verify'),
  getLoginUrl: () => client.public.get<{ loginUrl: string }>('auth/kakao/login'),
  getAuthToken: ({ code }: { code: string }) => client.public.get<{ token: string }>(`auth/kakao/token?code=${code}`),
});

/* card api */
const card = JSON_APIS({
  /* card Creations */
  // Todo : change to session
  createCard: ({ createCardDto }: { createCardDto: CreateCardDto }) =>
    client.session.post<{ result: boolean }>('cards', createCardDto),
  /* get List of Cards in deck: Get card information by deck id */
  // Todo : change to session
  getCards: ({ deckId }: { deckId: string }) => client.public.get<{ result: Card[] }>(`decks/${deckId}/cards`),
  /* delete card by id */
  // Todo : change to session
  deleteCard: ({ id }: { id: string }) => client.session.delete<{ result: boolean }>(`cards/${id}`),
});

/* deck api */

const deck = JSON_APIS({
  /* deck Creations: Upload a deck of cards */
  createDeck: ({ createDeckDto }: { createDeckDto: CreateDeckDto }) =>
    client.session.post<{ result: { deck_id: string } }>('decks', createDeckDto),
  /* get Deck: Get card information by deck id */
  getDeck: ({ deckId }: { deckId: string }) => client.public.get<{ result: Deck | null }>(`decks/${deckId}`),
  /* Get all deck info */
  getAllDeck: () => client.public.get<{ result: Deck[] }>(`decks`),
  /* Get deck list of user id */
  getDeckListByUserId: ({ userId }: { userId: string }) =>
    client.public.get<{ result: Deck[] }>(`decks/user/${userId}`),
  /* Get decks which created by user */
  getDeckListOfMine: () => client.session.get<{ result: Deck[] }>(`decks/me`),
});

export const api = {
  auth,
  card,
  deck,
};
