import { HttpStatus } from '@nestjs/common';
import { SUPPORTED_API_RES } from 'src/api';
import { Docs } from 'src/docs';

export const ApiDocsConstants = {
  HOME: {
    TAG_NAME: '🏠 Home',
    PING: {
      ApiOkOpConf: {
        summary: 'Api for checking the status of backend system',
        description:
          "This API indicates the status of the backend system, specifying whether the system is in an active state or not, by responding with a message called 'pong'",
      },
      ApiOkResConf: {
        description: 'Returns pong and client ip address',
        schema: Docs.schemas.ApiReplySchema,
      },
      ApiServerErrConf: {
        description:
          'An error occurred on server during processing of your request.',
        schema: Docs.schemas.ApiExceptionSchema,
      },
    },
    HEALTH_CHECK: {
      ApiOpConf: {
        summary: 'Api for checking the health of overall backend system',
        description: 'This api provides you overall health of backend system.',
      },
      ApiOkResConf: {
        description:
          'Returns all system operational message with client ip address',
        schema: Docs.schemas.ApiReplySchema,
      },
      ApiServerErrConf: {
        description:
          'An error occurred on server during processing of your request.',
        schema: Docs.schemas.ApiExceptionSchema,
      },
    },
  },
  UTILITIES: {
    NETWORKING: {
      TAGNAME: '🌎 Networking Utilities',
      CHECK_IP: {
        ApiOpConf: {
          summary: 'Api for checking the ip address of the client.',
          description:
            'This api provides the ip address of the client in the json, text, html and xml format.',
        },
        ApiQueryConf: {
          name: 'res_type',
          schema: Docs.schemas.CheckIpQuerySchema.res_type,
          enum: SUPPORTED_API_RES,
          description: 'Api response format',
        },
        ApiReplyConf: {
          status: HttpStatus.OK,
          description: 'The client request processed successfully.',
          content: {
            'application/json': { schema: Docs.schemas.ApiReplySchema },
            'application/xml': {
              schema: {
                format: 'application/xml',
                ...Docs.schemas.ApiXmlReplySchema,
              },
              example: `<?xml version="1.0" encoding="UTF-8"?>
                          <ApiResponse>
                              <ApiStatus>success</ApiStatus>
                              <ApiMessage>Operation succeeded</ApiMessage>
                              <ClientInfo>127.0.0.1</ClientInfo>
                              <Misc>
                                  <ip>127.0.0.1</ip>
                              </Misc>
                          </ApiResponse>`,
            },
            'text/html': {
              schema: { ...Docs.schemas.ApiReplySchema, format: 'text/html' },
            },
          },
        },
      },
      CHECK_MAIL_SERVER: {
        ApiOpConf: {
          summary: 'Api for checking the authenticity of an SMTP mail server.',
          description:
            'This API checks whether an email can be sent to the provided domain or not.',
        },
        ApiQueryConf: {
          name: 'domain',
          schema: Docs.schemas.CheckIpQuerySchema.domain,
          description: 'Domain you want to check',
        },
        ApiOkResConf: {
          description: 'Returns an answer telling authenticity of mail server.',
          schema: Docs.schemas.ApiReplySchema,
        },
      },
      CHECK_IP_LOC: {
        ApiOpConf: {
          summary: 'Api for checking location of specified public ip address.',
          description:
            'This api gives you the location of the specified public ip address.',
        },
        ApiQueryConf: {
          name: 'ip',
          schema: Docs.schemas.CheckIpLocQuerySchema.ip,
          description: 'Public ip address you want to check',
        },
        ApiOkResConf: {
          description:
            'Returns the location of the specified public ip address.',
          schema: Docs.schemas.IpLocApiReplySchema,
        },
        ApiBadReqResConf: {},
      },
    },
    MONETORY: {
      TAGNAME: '₹ Monetory Utilities',
      MISC_ALL_CURRENCIES: {
        ApiOpConf: {
          summary: 'Api that lists all currencies of the world.',
          description:
            'This api gives you the list of almost all currencies of the world.',
        },
        ApiOkResConf: {
          description:
            'Returns list of currencies of all countries in the world',
          schema: Docs.schemas.CurrencyApiReplySchema,
        },
      },
      CURRENCY_DENOMINATION: {
        ApiOpConf: {
          summary:
            'Api that lists all possible currency denominations of a specified amount.',
          description: `This API returns the currency denomination breakdown for a given amount. It divides the amount into the highest possible currency notes and coins based on standard denominations.By default, max allowed amount is ${process.env.MAX_ALLOWED_CURRENCY_AMT_WORDS || 'one lakh'}. <b>Please note that this amount is subject to change.</b><br/><br/> <b>How it works</b><br/> <ul> <li> The API takes an amount as input. </li> <li> It calculates how many currency notes and coins are needed to make up the given amount using the largest denominations first. </li> <li> The response includes a JSON object where keys represent currency denominations and values represent the number of times that denomination is used.</li></ul>`,
        },
        ApiOkResConf: {
          description:
            'Returns lists of all possible currency denominations of a specified amount.',
          schema: Docs.schemas.CurrencyDenominationApiReplySchema,
        },
        ApiBadReqResConf: {
          description: 'Occurs when the amount is less than or equal to zero.',
          schema: Docs.schemas.CurrencyDenominationBadReqReplySchema,
        },
        ApiNotAcceptableResConf: {
          description:
            'Occurs when the amount is greater than standard max allowed currency amount.',
          schema: Docs.schemas.CurrencyDenominationNotAcceptableReplySchema,
        },
        ApiQueryConf: {
          name: 'amount',
          schema: Docs.schemas.CurrencyDenominationQuerySchema,
          description: 'Amount you want the denomination for',
        },
      },
    },
    BASIC: {
      TAGNAME: '⚙️ Basic Utilities',
      MISC_ALL_COUNTRY: {
        ApiOpConf: {
          summary: 'Api that lists all countries of the world.',
          description:
            'This api gives you the list of almost all countries of the world.',
        },
        ApiOkResConf: {
          description: 'Returns list of all countries in the world',
          schema: Docs.schemas.CountryApiReplySchema,
        },
      },
      MISC_ALL_CURRENCIES: {
        ApiOpConf: {
          summary: 'Api that lists all currencies of the world.',
          description:
            'This api gives you the list of almost all currencies of the world.',
        },
        ApiOkResConf: {
          description:
            'Returns list of currencies of all countries in the world',
          schema: Docs.schemas.CurrencyApiReplySchema,
        },
      },
      CHECK_IP_LOC: {
        ApiOpConf: {
          summary: 'Api for checking location of specified public ip address.',
          description:
            'This api gives you the location of the specified public ip address.',
        },
        ApiQueryConf: {
          name: 'ip',
          schema: Docs.schemas.CheckIpLocQuerySchema.ip,
          description: 'Public ip address you want to check',
        },
        ApiOkResConf: {
          description:
            'Returns the location of the specified public ip address.',
          schema: Docs.schemas.IpLocApiReplySchema,
        },
        ApiBadReqResConf: {},
      },
    },
  },
  COMMONS: {
    ApiServerErrConf: {
      description:
        'An error occurred on server during processing of your request.',
      schema: Docs.schemas.ApiExceptionSchema,
    },
    ApiBadReqConf: {
      description: 'The client request is invalid.',
      schema: {
        anyOf: [
          Docs.schemas.BadReqApiReplySchema,
          Docs.schemas.IpLocLocalBadReqApiReplySchema,
          Docs.schemas.PrivateIpLocBadReqApiReplySchema,
        ],
      },
    },
  },
};

export enum ApiActionHandlerConstants {
  PING = 'ping',
  HEALTH_CHECK = 'health-check',
  IP_ADDRESS = 'check-ip',
  MAIL_ADDRESS = 'check-mail-server',
  IP_LOC = 'ip-loc',
  CURRENCY_DENOMINATION = 'currency-denomination',
}

export enum DbConstants {
  DB_DIALECT = 'postgres',
}

export enum TableNames {
  COUNTRY = 'country',
}
