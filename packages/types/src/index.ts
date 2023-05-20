export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

export type ApiSuccessResponse<T> = T & {
  ok: true;
};

export type ApiFailureResponse = {
  ok: false;
  error: {
    name: string;
    clientMessage: string;
    systemMessage: string;
    stack?: string;
  };
};
