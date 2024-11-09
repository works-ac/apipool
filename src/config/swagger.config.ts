import { DocumentBuilder } from '@nestjs/swagger';
import { SWAGGER_SERVERS } from 'src/constant';
import { Docs } from 'src/docs';

const { author } = Docs;
const localServerUrl = `http://${process.env.HOST}:${process.env.PORT}`;

export const swaggerConfigs = new DocumentBuilder()
  .setTitle('Apipool documentation')
  .setDescription(Docs.desc)
  .setVersion(Docs.version)
  .addBearerAuth()
  .addServer(localServerUrl, SWAGGER_SERVERS.LOCAL)
  .addServer(process.env.DEV_APIPOOL_URL, SWAGGER_SERVERS.DEV)
  .addServer(process.env.LIVE_APIPOOL_URL, SWAGGER_SERVERS.LIVE)
  .setContact(author.name, author.website, author.email)
  .setLicense('MIT Licensed', Docs.license)
  .build();
