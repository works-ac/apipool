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

export const IpLocApiReplySchema = {
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
      default: {
        status: 'success',
        message: 'Operation succeeded',
        entry_by: '127.0.0.1',
        details: {
          range: [824918016, 824926207],
          country: 'IN',
          region: 'PB',
          eu: '0',
          timezone: 'Asia/Kolkata',
          city: 'Ludhiana',
          ll: [31.0048, 75.9463],
          metro: 0,
          area: 50,
        },
      },
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

export const BadReqApiReplySchema = {
  type: 'object',
  format: 'application/json',
  properties: {
    status: {
      type: 'string',
      default: 'validation',
      examples: [
        'success',
        'error',
        'exception',
        'not found',
        'conflict',
        'validation',
      ],
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Operation failed',
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: null,
      description: 'The detailed api response',
    },
    entry_by: {
      type: 'string',
      default: '0.0.0.0',
      example: '<ip address of the client>',
      description: 'Describes the identity of the client',
    },
  },
  required: ['status', 'message', 'entry_by'],
};

export const IpLocLocalBadReqApiReplySchema = {
  type: 'object',
  format: 'application/json',
  properties: {
    status: {
      type: 'string',
      default: 'validation',
      examples: [
        'success',
        'error',
        'exception',
        'not found',
        'conflict',
        'validation',
      ],
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Operation failed, localhost detected',
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: null,
      description: 'The detailed api response',
    },
    entry_by: {
      type: 'string',
      default: '0.0.0.0',
      example: '<ip address of the client>',
      description: 'Describes the identity of the client',
    },
  },
  required: ['status', 'message', 'entry_by'],
};

export const PrivateIpLocBadReqApiReplySchema = {
  type: 'object',
  format: 'application/json',
  properties: {
    status: {
      type: 'string',
      default: 'validation',
      examples: [
        'success',
        'error',
        'exception',
        'not found',
        'conflict',
        'validation',
      ],
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Operation failed, private ip detected',
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: null,
      description: 'The detailed api response',
    },
    entry_by: {
      type: 'string',
      default: '0.0.0.0',
      example: '<ip address of the client>',
      description: 'Describes the identity of the client',
    },
  },
  required: ['status', 'message', 'entry_by'],
};

export const CountryApiReplySchema = {
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
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Api operation succeeded',
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: [
        {
          name: 'Iceland',
          dial_code: '+354',
          emoji: '🇮🇸',
          code: 'IS',
        },
        {
          name: 'India',
          dial_code: '+91',
          emoji: '🇮🇳',
          code: 'IN',
        },
      ],
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

export const CurrencyApiReplySchema = {
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
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Api operation succeeded',
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: [
        { country: 'Russia', currency: 'RUB', symbol: '₽' },
        { country: 'India', currency: 'INR', symbol: '₹' },
      ],
      description: 'The detailed currency api response',
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

export const CurrencyDenominationApiReplySchema = {
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
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Api operation succeeded',
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: { '2': 1, '5': 1, '10': 1, '50': 1, '200': 1, '500': 1084306 },
      description: 'The detailed currency-denomination api response',
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

export const CurrencyDenominationBadReqReplySchema = {
  type: 'object',
  format: 'application/json',
  properties: {
    status: {
      type: 'string',
      default: 'validation',
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Api operation failed',
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: { msg: 'Amount should be a natural number' },
      description: 'The detailed currency-denomination api response',
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

export const CurrencyDenominationNotAcceptableReplySchema = {
  type: 'object',
  format: 'application/json',
  properties: {
    status: {
      type: 'string',
      default: 'validation',
      description: 'Define the status of the api operation',
    },
    message: {
      type: 'string',
      default: 'Api operation failed',
      description: 'Define message returned by the api',
    },
    details: {
      type: 'object',
      default: { msg: 'Amount is too big' },
      description: 'The detailed currency-denomination api response',
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

export const CurrencyDenominationQuerySchema = {
  type: 'number',
};

export const CheckIpLocQuerySchema = {
  res_type: {
    type: 'string',
    required: ['res_type'],
    examples: ['json', 'text', 'html', 'xml'],
  },
  ip: {
    type: 'string',
    requried: ['ip'],
    example: '172.32.56.122',
  },
};
