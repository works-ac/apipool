import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse, ApiStatus, URLS } from 'src/api';
import * as path from 'path';
import { ApiDocsConstants } from 'src/i18n';
import { Helpers } from 'src/helpers';
import { CURRENCY_NOTES } from 'src/constant';

@Controller(URLS.MONETORY_CONTROLLER_URL)
@ApiTags(ApiDocsConstants.UTILITIES.MONETORY.TAGNAME)
export class MonetoryController {
  @ApiOperation(
    ApiDocsConstants.UTILITIES.MONETORY.MISC_ALL_CURRENCIES.ApiOpConf,
  )
  @ApiOkResponse(
    ApiDocsConstants.UTILITIES.MONETORY.MISC_ALL_CURRENCIES.ApiOkResConf,
  )
  @ApiInternalServerErrorResponse(ApiDocsConstants.COMMONS.ApiServerErrConf)
  @Get('currencies')
  public async getAllCurrencies(@Ip() ipAddress: string): Promise<ApiResponse> {
    const reply = new ApiResponse();
    const filePath = path.resolve(__dirname, '../../../', 'json/currency.json');

    reply.status = ApiStatus.SUCCESS;
    reply.message = 'Operation succeeded';
    reply.entry_by = ipAddress || '0.0.0.0';
    reply.details = await Helpers.loadJSONContent(filePath);

    return reply;
  }

  @ApiOperation(
    ApiDocsConstants.UTILITIES.MONETORY.CURRENCY_DENOMINATION.ApiOpConf,
  )
  @ApiOkResponse(
    ApiDocsConstants.UTILITIES.MONETORY.CURRENCY_DENOMINATION.ApiOkResConf,
  )
  @ApiBadRequestResponse(
    ApiDocsConstants.UTILITIES.MONETORY.CURRENCY_DENOMINATION.ApiBadReqResConf,
  )
  @ApiNotAcceptableResponse(
    ApiDocsConstants.UTILITIES.MONETORY.CURRENCY_DENOMINATION
      .ApiNotAcceptableResConf,
  )
  @ApiQuery(
    ApiDocsConstants.UTILITIES.MONETORY.CURRENCY_DENOMINATION.ApiQueryConf,
  )
  @ApiInternalServerErrorResponse(ApiDocsConstants.COMMONS.ApiServerErrConf)
  @Get('currency-denomination')
  public currencyDenomination(
    @Query('amount', new DefaultValuePipe(0), new ParseIntPipe())
    amount: number,
    @Ip() ipAddress: string,
  ): ApiResponse {
    const reply = new ApiResponse();
    const maxAllowedAmount =
      Number(process.env.MAX_ALLOWED_CURRENCY_AMT) || 1e5;

    if (amount <= 0) {
      reply.status = ApiStatus.VALIDATION;
      reply.message = 'Operation failed';
      reply.entry_by = ipAddress || '0.0.0.0';
      reply.details = { msg: 'Amount should be a natural number' };

      throw new HttpException(reply, HttpStatus.BAD_REQUEST);
    }

    if (amount > maxAllowedAmount) {
      reply.status = ApiStatus.VALIDATION;
      reply.message = 'Operation failed';
      reply.entry_by = ipAddress || '0.0.0.0';
      reply.details = { msg: 'Amount is too large' };

      throw new HttpException(reply, HttpStatus.NOT_ACCEPTABLE);
    }

    const helpers = new Helpers();

    reply.status = ApiStatus.SUCCESS;
    reply.message = 'Operation succeeded';
    reply.entry_by = ipAddress || '0.0.0.0';
    reply.details = helpers.currencyDenomination(amount, CURRENCY_NOTES);
    return reply;
  }
}
