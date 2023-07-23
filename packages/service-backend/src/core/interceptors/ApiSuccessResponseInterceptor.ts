import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ApiSuccessResponse } from '@ppoba/types';
import { map, Observable } from 'rxjs';

@Injectable()
export class ApiSuccessResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // map json response only
        if (data != null && typeof data === 'object') {
          const apiSuccessResponse: ApiSuccessResponse<any> = { ...data, ok: true };
          return apiSuccessResponse;
        } else {
          return data;
        }
      })
    );
  }
}
