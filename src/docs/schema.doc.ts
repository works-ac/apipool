export const ApiReplySchema = {
  type: 'object',
  format: 'application/json',
  properties: {
    status: {
      type: 'string',
      default: 'success',
      examples: [
        'success',
        'error',
        'exception',
        'not found',
        'conflict',
        'validation',
      ],
      required: ['true'],
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Api operation succeeded',
      examples: ['Pong', 'All systems are operational'],
      required: ['true'],
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: null,
      required: ['false'],
      description: 'The detailed api response',
    },
    entry_by: {
      type: 'string',
      default: '0.0.0.0',
      example: '<ip address of the client>',
      required: ['true'],
      description: 'Describes the identity of the client',
    },
  },
};

export const ApiXmlReplySchema = {
  type: 'object',
  properties: {
    ApiResponse: {
      type: 'object',
      properties: {
        ApiStatus: {
          type: 'string',
          default: 'success',
          examples: [
            'success',
            'error',
            'exception',
            'not found',
            'conflict',
            'validation',
          ],
          required: ['true'],
          description: 'Define the status of the api operation',
        },
        ApiMessage: {
          type: 'string',
          default: 'Api operation succeeded',
          examples: ['Pong', 'All systems are operational'],
          required: ['true'],
          description: 'Define message returned by the api',
        },
        Misc: {
          type: 'object',
          default: null,
          required: ['false'],
          description: 'The detailed api response',
        },
        ClientInfo: {
          type: 'string',
          default: '0.0.0.0',
          example: '<ip address of the client>',
          required: ['true'],
          description: 'Describes the identity of the client',
        },
      },
    },
  },
};

export const ApiExceptionSchema = {
  type: 'object',
  format: 'application/json',
  properties: {
    status: {
      type: 'string',
      default: 'exception',
      examples: [
        'success',
        'error',
        'exception',
        'not found',
        'conflict',
        'validation',
      ],
      required: ['true'],
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Api operation succeeded',
      example: 'An error occurred',
      required: ['true'],
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: null,
      required: ['false'],
      description: 'The detailed api response',
    },
    entry_by: {
      type: 'string',
      default: '0.0.0.0',
      example: '<ip address of the client>',
      required: ['true'],
      description: 'Describes the identity of the client',
    },
  },
};

export const CheckIpQuerySchema = {
  res_type: {
    type: 'string',
    required: ['res_type'],
    examples: ['json', 'text', 'html', 'xml'],
  },
  domain: {
    type: 'string',
    requried: ['domain'],
    example: 'google.com',
    examples: ['gmail.com', 'outlook.com', 'hotmail.com'],
  },
};
