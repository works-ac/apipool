import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SUPPORTED_API_RES } from 'src/api';

@Injectable()
export class ContentTypeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap((_) => {
        console.log(_);

        const resType = request.query.res_type;

        if (resType === SUPPORTED_API_RES.XML) {
          response.setHeader('content-type', 'application/xml');
        } else if (resType === SUPPORTED_API_RES.HTM) {
          response.setHeader('content-type', 'text/html');
        } else if (resType === SUPPORTED_API_RES.TXT) {
          response.setHeader('content-type', 'text/plain');
        } else {
          response.setHeader('content-type', 'application/json');
        }
      }),
    );
  }
}
