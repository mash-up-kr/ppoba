export class BaseError extends Error {
  constructor(
    public readonly message: string,
    public readonly diagnotics: string[] = []
  ) {
    super(message);
  }
}

export class ConfigurationError extends BaseError {}

export class ConfigurationWarning extends BaseError {}
