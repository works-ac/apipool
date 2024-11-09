import { ApiExceptionSchema, ApiReplySchema } from './schema.doc';

const Description =
  'An open-source repository that provide pool of apis and pre-built apps related to almost all use cases to software professionals and common peoples.';

export const Docs = {
  schemas: { ApiReplySchema, ApiExceptionSchema },
  desc: Description,
  version: process.env.VERSION || 'v1.1',
  author: {
    name: 'Gaurav Sahitya',
    email: process.env.SWAGGER_EMAIL,
    website: process.env.SWAGGER_WEBSITE,
  },
  license: process.env.REPO_LICENSE_URL,
};
