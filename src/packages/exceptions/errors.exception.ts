import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiStatus } from 'src/api';

@Catch()
export class GeneralException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse() as Response;
    const request = host.switchToHttp().getRequest() as Request;

    const status = exception.getStatus ? exception.getStatus() : 500;
    const details = exception.getResponse ? exception.getResponse() : {};
    const message = exception?.message || 'An error occurred';

    return response.status(status).json({
      message,
      entry_by: request.ip || '0.0.0.0',
      status: ApiStatus.EXCEPTION,
      ...details,
    });
  }
}
