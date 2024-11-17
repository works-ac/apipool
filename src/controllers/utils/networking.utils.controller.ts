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
} from '@nestjs/swagger';
import { ApiResponse, ApiStatus, SUPPORTED_API_RES, URLS } from 'src/api';
import { Helpers } from 'src/helpers';
import { ApiActionHandlerConstants, ApiDocsConstants } from 'src/i18n';
import { Packages } from 'src/packages';

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
}
