import { BaseError, CheckFailureError } from './CheckListError';

export type CheckResult =
  | {
      result: 'success';
      message: string | void;
    }
  | {
      result: 'warning';
      message: string | void;
      diagnotics?: string[];
    }
  | {
      result: 'failure';
      message: string | void;
      diagnotics?: string[];
    };

export type Checker = {
  check: () => Promise<CheckResult>;
};

export function createChecker(check: () => Promise<void | string>): Checker {
  return {
    check: async () => {
      try {
        const message = await check();
        return { message, result: 'success' };
      } catch (e) {
        if (e instanceof BaseError) {
          return {
            result: e instanceof CheckFailureError ? 'failure' : 'warning',
            message: e.message,
            diagnotics: e.diagnotics,
          };
        }
        throw e;
      }
    },
  };
}
