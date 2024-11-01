import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse, ApiStatus, BASE_URL } from 'src/api';

@Controller(`${BASE_URL}/`)
export class AppController {
  @Get('ping')
  public ping(@Req() request: Request, @Res() response: Response): Response {
    const reply = new ApiResponse(
      ApiStatus.SUCCESS,
      'Pong',
      request.ip || '0.0.0.0',
    );

    return response.status(HttpStatus.OK).json(reply);
  }

  @Get('health-check')
  public healthCheck(
    @Req() request: Request,
    @Res() response: Response,
  ): Response {
    const reply = new ApiResponse(
      ApiStatus.SUCCESS,
      'All system are operational',
      request.ip || '0.0.0.0',
    );

    return response.status(HttpStatus.OK).json(reply);
  }
}
