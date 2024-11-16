import { Controller, Get, Ip } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse, ApiStatus, BASE_URL } from 'src/api';
import { ApiDocsConstants } from 'src/i18n';

@Controller(`${BASE_URL}/`)
@ApiTags('Home')
export class AppController {
  @Get('ping')
  @ApiOperation(ApiDocsConstants.HOME.PING.ApiOkOpConf)
  @ApiOkResponse(ApiDocsConstants.HOME.PING.ApiOkResConf)
  @ApiInternalServerErrorResponse(ApiDocsConstants.HOME.PING.ApiServerErrConf)
  public ping(@Ip() ipAddress: string): ApiResponse {
    const reply = new ApiResponse(
      ApiStatus.SUCCESS,
      'Pong',
      ipAddress || '0.0.0.0',
    );

    return reply;
  }

  @Get('health-check')
  @ApiOperation(ApiDocsConstants.HOME.HEALTH_CHECK.ApiOpConf)
  @ApiOkResponse(ApiDocsConstants.HOME.HEALTH_CHECK.ApiOkResConf)
  @ApiInternalServerErrorResponse(
    ApiDocsConstants.HOME.HEALTH_CHECK.ApiServerErrConf,
  )
  public healthCheck(@Ip() ipAddress: string): ApiResponse {
    const reply = new ApiResponse(
      ApiStatus.SUCCESS,
      'All system are operational',
      ipAddress || '0.0.0.0',
    );

    return reply;
  }
}
