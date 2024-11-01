import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GeneralException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest() as Request;
    const response = host.switchToHttp().getResponse() as Response;

    const status = exception?.getStatus() || 500;
    const details = exception?.getResponse() || {};

    return response
      .status(status)
      .json({ message: 'An error occurred', ...details });
  }
}
