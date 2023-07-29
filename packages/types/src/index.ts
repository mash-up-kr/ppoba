export * from './database';
export * from './dto';
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

export type ApiSuccessResponse<T> = T & {
  ok: true;
};

export type ApiFailureResponse = {
  ok: false;
  error: {
    name: string; // 소문자 snake_case로 통일. 'invalid_password' | 'bad_arguments' | 'authentication_required' 등등
    message: string;
    stack?: string;
  };
};

export const DEFAULT_CLIENT_MESSAGE = '서비스를 일시적으로 사용할 수 없습니다. 잠시 후에 다시 시도해주세요.';

export const DEFAULT_ERROR_NAME = 'unknown';
