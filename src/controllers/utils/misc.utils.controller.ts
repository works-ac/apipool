import { Controller, DefaultValuePipe, Get, Ip, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse, ApiStatus, URLS } from 'src/api';
import * as path from 'path';
import { ApiDocsConstants } from 'src/i18n';
import { Helpers } from 'src/helpers';
import { InjectModel } from '@nestjs/sequelize';
import { CountryModel } from 'src/db/models';
import { DB_MODEL_EXCLUDED_ATTRS, GLOBAL_PAGINATION_LIMIT } from 'src/constant';

@Controller(URLS.MISC_CONTROLLER_URL)
@ApiTags(ApiDocsConstants.UTILITIES.BASIC.TAGNAME)
export class MiscController {
  constructor(@InjectModel(CountryModel) private readonly countryModel: typeof CountryModel) { }

  @ApiOperation(ApiDocsConstants.UTILITIES.BASIC.MISC_ALL_COUNTRY.ApiOpConf)
  @ApiOkResponse(ApiDocsConstants.UTILITIES.BASIC.MISC_ALL_COUNTRY.ApiOkResConf)
  @ApiBadRequestResponse(ApiDocsConstants.UTILITIES.BASIC.MISC_ALL_COUNTRY.ApiBadReqConf)
  @ApiQuery(ApiDocsConstants.UTILITIES.BASIC.MISC_ALL_COUNTRY.ApiQueryConf)
  @ApiInternalServerErrorResponse(ApiDocsConstants.COMMONS.ApiServerErrConf)
  @Get('geography/countries')
  public async getAllCountries(@Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number, @Ip() ipAddress: string): Promise<ApiResponse> {
    const reply = new ApiResponse();
    const offset = (page - 1) * GLOBAL_PAGINATION_LIMIT;

    const { count, rows } = await this.countryModel.findAndCountAll({ attributes: { exclude: DB_MODEL_EXCLUDED_ATTRS }, offset, limit: GLOBAL_PAGINATION_LIMIT });

    reply.status = ApiStatus.SUCCESS;
    reply.message = 'Operation succeeded';
    reply.entry_by = ipAddress || '0.0.0.0';
    reply.details = { countries: rows, totalRecords: count };

    return reply;
  }
}
