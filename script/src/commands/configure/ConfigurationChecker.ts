import { abort } from 'process';
import { Category } from './Category';
import { BaseError, ConfigurationError } from './ConfigurationError';

export interface ConfigurationCheckerArguments {
  name: string;
  tag: string[];
}

export type ConfigurationCheckResult =
  | {
      title: string;
      message: string;
      result: 'success';
    }
  | {
      title: string;
      result: 'warning';
      message: string;
      diagnotics: string[];
    }
  | {
      title: string;
      result: 'failure';
      message: string;
      diagnotics: string[];
    };

export interface ConfigurationChecker {
  check(): Promise<ConfigurationCheckResult>;
  category: Category;
  title: string;
}

/**
 * 프로젝트 설정값이 유효한지 확인하는 체커 클래스를 만듭니다.
 */
export function ConfigurationChecker({
  title,
  category,
}: {
  title: string;
  category: Category;
}) {
  abstract class AbstractChecker {
    abstract _check(): Promise<string>;

    public readonly category = category;

    public readonly title = title;

    async check(): Promise<ConfigurationCheckResult> {
      try {
        const message = await this._check();
        return { title, message, result: 'success' };
      } catch (e) {
        if (e instanceof BaseError) {
          return {
            title: title,
            result: e instanceof ConfigurationError ? 'failure' : 'warning',
            message: e.message,
            diagnotics: e.diagnotics,
          };
        }
        throw e;
      }
    }
  }
  return AbstractChecker;
}
