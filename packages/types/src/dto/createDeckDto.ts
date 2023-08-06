export type CreateDeckDto = { name: string; userId: string; category: DeckCategory[] };

export type DeckCategory =
  | '비밀'
  | '취미'
  | '미래'
  | '가치관'
  | '특이취향'
  | '연애∙결혼'
  | '과거'
  | '인간관계'
  | '19금 컨텐츠';
