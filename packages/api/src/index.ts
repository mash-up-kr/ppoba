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
  // Todo : change to session
  createCard: ({ createCardDto }: { createCardDto: CreateCardDto }) =>
    client.public.post<{ result: boolean }>('cards', createCardDto),
  /* get List of Cards in deck: Get card information by deck id */
  // Todo : change to session
  getCards: ({ deckId }: { deckId: string }) =>
    client.public.get<{ result: Card[] | null }>(`decks/id=${deckId}/cards`),
  /* delete card by id */
  // Todo : change to session
  deleteCard: ({ id }: { id: string }) => client.public.delete<{ result: boolean }>(`cards/id=${id}`),
});

/* deck api */

const deck = JSON_APIS({
  /* deck Creations: Upload a deck of cards */
  // Todo : change to session
  createDeck: ({ createDeckDto }: { createDeckDto: CreateDeckDto }) =>
    client.public.post<{ result: { deck_id: string } }>('decks', createDeckDto),
  /* get Deck: Get card information by deck id */
  // Todo : change to session
  getDeck: ({ deckId }: { deckId: string }) => client.public.get<{ result: Deck | null }>(`decks/id=${deckId}`),
  /* Get all deck info */
  getAllDeck: () => client.public.get<{ result: Deck[] }>(`decks`),
  /* Get deck list of user id */
  getDeckListByUserId: ({ userId }: { userId: string }) =>
    client.public.get<{ result: Deck[] | null }>(`decks/user/${userId}`),
});

export const api = {
  auth,
  card,
  deck,
};
