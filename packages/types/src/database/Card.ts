export type Card = {
  id: string;

  content: string;

  deckId: string;

  createdAt: Date;

  deletedAt: Date | null;

  updatedAt: Date;
};
