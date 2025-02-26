import * as geoip from 'geoip-lite';

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiResponse as ApiReply,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ApiResponse, ApiStatus, SUPPORTED_API_RES, URLS } from 'src/api';
import { Helpers } from 'src/helpers';
import { ApiActionHandlerConstants, ApiDocsConstants } from 'src/i18n';
import { Packages } from 'src/packages';
import { REGEX } from 'src/constant';

const { ParseSuppResTypeQuery } = Packages.PIPES;
const { ContentTypeInterceptor } = Packages.INTERCEPTORS;

@Controller(URLS.NETWORKING_CONTROLLER_URL)
@ApiTags(ApiDocsConstants.UTILITIES.BASIC.TAGNAME)
export class NetworkingController {
  @ApiOperation(ApiDocsConstants.UTILITIES.BASIC.CHECK_IP.ApiOpConf)
  @ApiQuery(ApiDocsConstants.UTILITIES.BASIC.CHECK_IP.ApiQueryConf)
  @ApiReply(ApiDocsConstants.UTILITIES.BASIC.CHECK_IP.ApiReplyConf)
  @ApiInternalServerErrorResponse(ApiDocsConstants.COMMONS.ApiServerErrConf)
  @Get(ApiActionHandlerConstants.IP_ADDRESS)
  @UseInterceptors(ContentTypeInterceptor)
  public checkIpAddr(
    @Ip() ipAddress: string,
    @Query('res_type', ParseSuppResTypeQuery) res_type: SUPPORTED_API_RES,
  ) {
    const reply = new ApiResponse(
      ApiStatus.SUCCESS,
      'Operation succeeded',
      ipAddress,
      { ip: ipAddress },
    );

    if (res_type === SUPPORTED_API_RES.JSON) return reply;
    else if (res_type === SUPPORTED_API_RES.TXT) return reply.toText();
    else if (res_type === SUPPORTED_API_RES.HTM) return reply.toHtml();
    else if (res_type === SUPPORTED_API_RES.XML) return reply.toXml();
    else return reply;
  }

  @ApiOperation(ApiDocsConstants.UTILITIES.BASIC.CHECK_MAIL_SERVER.ApiOpConf)
  @ApiQuery(ApiDocsConstants.UTILITIES.BASIC.CHECK_MAIL_SERVER.ApiQueryConf)
  @ApiOkResponse(
    ApiDocsConstants.UTILITIES.BASIC.CHECK_MAIL_SERVER.ApiOkResConf,
  )
  @ApiInternalServerErrorResponse(ApiDocsConstants.COMMONS.ApiServerErrConf)
  @Get(ApiActionHandlerConstants.MAIL_ADDRESS)
  public async checkMailServer(
    @Ip() ipAddress: string,
    @Query('domain') domain: string,
  ) {
    const reply = new ApiResponse();
    await Helpers.checkForMailServer(domain);

    if (!domain) {
      reply.message = 'Operation succeeded';
      reply.status = ApiStatus.VALIDATION;
      reply.details = { ans: 'All fields are mandatory.' };
      reply.entry_by = ipAddress || '0.0.0.0';

      throw new HttpException(reply, HttpStatus.BAD_REQUEST);
    }

    reply.message = 'Operation succeeded';
    reply.status = ApiStatus.SUCCESS;
    reply.details = { ans: 'DELIVERABLE' };
    reply.entry_by = ipAddress || '0.0.0.0';

    return reply;
  }

  @ApiOperation(ApiDocsConstants.UTILITIES.BASIC.CHECK_IP_LOC.ApiOpConf)
  @ApiQuery(ApiDocsConstants.UTILITIES.BASIC.CHECK_IP_LOC.ApiQueryConf)
  @ApiOkResponse(ApiDocsConstants.UTILITIES.BASIC.CHECK_IP_LOC.ApiOkResConf)
  @ApiBadRequestResponse(ApiDocsConstants.COMMONS.ApiBadReqConf)
  @ApiInternalServerErrorResponse(ApiDocsConstants.COMMONS.ApiServerErrConf)
  @Get(ApiActionHandlerConstants.IP_LOC)
  public async getIpLoc(
    @Query('ip') ip: string,
    @Ip() ipAddress: string,
  ): Promise<ApiResponse> {
    const reply = new ApiResponse();

    if (!ip || !REGEX.IP.test(ip)) {
      reply.status = ApiStatus.VALIDATION;
      reply.message = 'Operation failed';
      reply.entry_by = ipAddress || '0.0.0.0';

      throw new HttpException(reply, HttpStatus.BAD_REQUEST);
    }
    if (
      REGEX.CLASS_A_IP.test(ip) ||
      REGEX.CLASS_B_IP.test(ip) ||
      REGEX.CLASS_C_IP.test(ip)
    ) {
      reply.status = ApiStatus.VALIDATION;
      reply.message = 'Operation failed, private ip detected';
      reply.entry_by = ipAddress || '0.0.0.0';

      throw new HttpException(reply, HttpStatus.BAD_REQUEST);
    }
    if (ip === '127.0.0.1' || ip === 'localhost') {
      reply.status = ApiStatus.VALIDATION;
      reply.message = 'Operation failed, localhost detected';
      reply.entry_by = ipAddress || '0.0.0.0';

      throw new HttpException(reply, HttpStatus.BAD_REQUEST);
    }

    const ipLocDetails = geoip.lookup(ip);

    reply.message = 'Operation succeeded';
    reply.status = ApiStatus.SUCCESS;
    reply.details = ipLocDetails;
    reply.entry_by = ipAddress || '0.0.0.0';

    return reply;
  }
}
