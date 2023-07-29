import { atom } from "recoil";
import { CardList } from '@ppoba/types/src/dto/createCardDto';

type DeckFormAtomState = {
  name: string;
  category: string[];
  cardList: CardList[];
}

export const deckFormAtomState = atom<DeckFormAtomState>({
  key: "deckForm",
  default: {
    name: "",
    category: [],
    cardList: new Array(20).fill({}),
  }
});
