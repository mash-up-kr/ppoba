export type Deck = {
  id: string;
  name: string;
  // TODO category m:n relation
  category: string[];
  // TODO card 1:n relation and aggregate card count
  cardIds: string[];
  // TODO card 1:n relation and aggregate card count
  totalCardCount: number;
  // TODO user m:n relation fk
  userId: string;
};
