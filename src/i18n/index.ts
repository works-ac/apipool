import { Docs } from 'src/docs';

export const ApiDocsConstants = {
  HOME: {
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
};
