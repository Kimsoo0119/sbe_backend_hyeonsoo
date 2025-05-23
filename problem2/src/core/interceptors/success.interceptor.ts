import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const status = context.getArgByIndex(1).statusCode;

    return next.handle().pipe(
      map((data) => {
        if (data && data.statusCode) {
          const { status, ...etc } = data;

          return { status, data: etc };
        }

        return { status, data };
      }),
    );
  }
}
