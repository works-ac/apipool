import { HttpStatus } from '@nestjs/common';
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
    BASIC: {
      TAGNAME: '⚙️ Basic Utilities',
      CHECK_IP: {
        ApiOpConf: {
          summary: 'Api for checking the ip address of the client.',
          description:
            'This api provides the ip address of the client in the json, text, html and xml format.',
        },
        ApiQueryConf: {
          name: 'res_type',
          schema: Docs.schemas.CheckIpQuerySchema.res_type,
          description: 'Api response query',
          allowEmptyValue: true,
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
    },
  },
  COMMONS: {
    ApiServerErrConf: {
      description:
        'An error occurred on server during processing of your request.',
      schema: Docs.schemas.ApiExceptionSchema,
    },
  },
};

export enum ApiActionHandlerConstants {
  PING = 'ping',
  HEALTH_CHECK = 'health-check',
  IP_ADDRESS = 'check-ip',
  MAIL_ADDRESS = 'check-mail-server',
  IP_LOC = 'ip-loc',
}
