export class BaseError extends Error {
  constructor(public readonly message: string, public readonly diagnotics: string[] = []) {
    super(message);
  }
}

export class CheckFailureError extends BaseError {}

export class CheckWarningError extends BaseError {}
