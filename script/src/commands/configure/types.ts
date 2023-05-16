import { Checker } from './Chekcer';

export const categories = ['all', 'system', 'aws'] as const;

export type Category = (typeof categories)[number];

export type CheckList<Keys extends string = string> = {
  [key in Keys]: CheckList | Checker;
};

export type RootChecklist = CheckList<`${Category}: ${string}`>;
