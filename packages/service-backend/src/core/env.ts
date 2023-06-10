import { assert } from 'typia';

export type Stage = 'dev' | 'prod';

export const stage = assert<Stage>(process.env.STAGE ?? 'dev');

export const stageValue = <T extends string>(value: T): string => {
  if (stage === 'prod') {
    return value;
  } else {
    return value + `-dev`;
  }
};
