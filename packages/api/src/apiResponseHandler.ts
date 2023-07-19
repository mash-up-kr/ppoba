import { AxiosResponse } from 'axios';
import { ApiResponse } from '@ppoba/types';

export function JSON_APIS<T extends Record<string, any>>(
  apiMap: T
): {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<AxiosResponse<infer R, any>>
    ? (...args: A) => Promise<R>
    : never;
} {
  const mapped: any = {};

  for (const key in apiMap) {
    const apiMethod = apiMap[key];
    mapped[key] = (...args: any[]) => handleApiResponse(apiMethod.apply(null, args));
  }

  return mapped;
}

export async function handleApiResponse<T = any>(
  axiosResponsePromise: Promise<AxiosResponse<ApiResponse<T>, any>>
): Promise<T> {
  const response = await axiosResponsePromise;

  if (response.data.ok === false) {
    throw new ApiError(response.data.error);
  }

  Reflect.deleteProperty(response.data, 'ok');
  return response.data as T;
}

export class ApiError extends Error {
  constructor({ name, message }: { name: string; message: string }) {
    super(message);
    this.name = name;
    this.message = message;
  }
}
