import { Controller, Get, Ip } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse, ApiStatus, BASE_URL } from 'src/api';
import { Docs } from 'src/docs';

@Controller(`${BASE_URL}/`)
@ApiTags('Home')
export class AppController {
  @Get('ping')
  @ApiOperation({ summary: 'Api for checking the status of backend system' })
  @ApiOkResponse({
    description: 'Returns pong and client ip address',
    schema: Docs.schemas.ApiReplySchema,
  })
  @ApiInternalServerErrorResponse({
    description:
      'Some error occurred on server during processing of your request.',
    schema: Docs.schemas.ApiExceptionSchema,
  })
  public ping(@Ip() ipAddress: string): ApiResponse {
    const reply = new ApiResponse(
      ApiStatus.SUCCESS,
      'Pong',
      ipAddress || '0.0.0.0',
    );

    return reply;
  }

  @Get('health-check')
  @ApiOperation({
    summary: 'Api for checking the health of overall backend system',
  })
  @ApiOkResponse({
    description:
      'Returns all system operational message with client ip address',
    schema: Docs.schemas.ApiReplySchema,
  })
  @ApiInternalServerErrorResponse({
    description:
      'Some error occurred on server during processing of your request.',
    schema: Docs.schemas.ApiExceptionSchema,
  })
  public healthCheck(@Ip() ipAddress: string): ApiResponse {
    const reply = new ApiResponse(
      ApiStatus.SUCCESS,
      'All system are operational',
      ipAddress || '0.0.0.0',
    );

    return reply;
  }
}
