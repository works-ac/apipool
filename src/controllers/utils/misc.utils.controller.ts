import { Controller, Get, Ip } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse, ApiStatus, URLS } from 'src/api';
import * as path from 'path';
import { ApiDocsConstants } from 'src/i18n';
import { Helpers } from 'src/helpers';

@Controller(URLS.MISC_CONTROLLER_URL)
@ApiTags(ApiDocsConstants.UTILITIES.BASIC.TAGNAME)
export class MiscController {
  @ApiOperation(ApiDocsConstants.UTILITIES.BASIC.MISC_ALL_COUNTRY.ApiOpConf)
  @ApiOkResponse(ApiDocsConstants.UTILITIES.BASIC.MISC_ALL_COUNTRY.ApiOkResConf)
  @ApiInternalServerErrorResponse(ApiDocsConstants.COMMONS.ApiServerErrConf)
  @Get('geography/countries')
  public async getAllCountries(@Ip() ipAddress: string): Promise<ApiResponse> {
    const reply = new ApiResponse();
    const filePath = path.resolve(
      __dirname,
      '../../../',
      'json/countries.json',
    );

    reply.status = ApiStatus.SUCCESS;
    reply.message = 'Operation succeeded';
    reply.entry_by = ipAddress || '0.0.0.0';
    reply.details = await Helpers.loadJSONContent(filePath);

    return reply;
  }

  @ApiOperation(ApiDocsConstants.UTILITIES.BASIC.MISC_ALL_CURRENCIES.ApiOpConf)
  @ApiOkResponse(
    ApiDocsConstants.UTILITIES.BASIC.MISC_ALL_CURRENCIES.ApiOkResConf,
  )
  @ApiInternalServerErrorResponse(ApiDocsConstants.COMMONS.ApiServerErrConf)
  @Get('monetory/currencies')
  public async getAllCurrencies(@Ip() ipAddress: string): Promise<ApiResponse> {
    const reply = new ApiResponse();
    const filePath = path.resolve(__dirname, '../../../', 'json/currency.json');

    reply.status = ApiStatus.SUCCESS;
    reply.message = 'Operation succeeded';
    reply.entry_by = ipAddress || '0.0.0.0';
    reply.details = await Helpers.loadJSONContent(filePath);

    return reply;
  }
}
