import {
  ApiExceptionSchema,
  ApiReplySchema,
  CountryApiReplySchema,
  ApiXmlReplySchema,
  CheckIpQuerySchema,
  CurrencyApiReplySchema,
  CheckIpLocQuerySchema,
  IpLocApiReplySchema,
  BadReqApiReplySchema,
  IpLocLocalBadReqApiReplySchema,
  PrivateIpLocBadReqApiReplySchema,
  CurrencyDenominationApiReplySchema,
  CurrencyDenominationBadReqReplySchema,
  CurrencyDenominationNotAcceptableReplySchema,
  CurrencyDenominationQuerySchema,
} from './schema.doc';

const Description =
  process.env.API_DOC_DESC ||
  'An open-source repository that provide pool of apis and pre-built apps related to almost all use cases to software professionals and common peoples.';

export const Docs = {
  schemas: {
    ApiReplySchema,
    IpLocApiReplySchema,
    ApiExceptionSchema,
    CheckIpQuerySchema,
    CheckIpLocQuerySchema,
    ApiXmlReplySchema,
    CountryApiReplySchema,
    CurrencyApiReplySchema,
    CurrencyDenominationApiReplySchema,
    CurrencyDenominationBadReqReplySchema,
    BadReqApiReplySchema,
    IpLocLocalBadReqApiReplySchema,
    PrivateIpLocBadReqApiReplySchema,
    CurrencyDenominationNotAcceptableReplySchema,
    CurrencyDenominationQuerySchema,
  },
  desc: Description,
  version: process.env.VERSION || 'v1.1',
  author: {
    name: 'Gaurav Sahitya',
    email: process.env.SWAGGER_EMAIL,
    website: process.env.SWAGGER_WEBSITE,
  },
  license: process.env.REPO_LICENSE_URL,
  title: process.env.API_DOC_TITLE || 'Apipool documentation',
};
