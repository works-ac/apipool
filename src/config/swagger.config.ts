import { DocumentBuilder } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiResponse, ApiStatus } from 'src/api';
import { ENVIRONMENTS, SWAGGER_SERVERS } from 'src/constant';
import { Docs } from 'src/docs';

const { author } = Docs;

export class SwaggerConf {
  private readonly url;

  constructor(private readonly environment: ENVIRONMENTS) {
    if (environment === ENVIRONMENTS.LOCAL)
      this.url = `http://${process.env.HOST}:${process.env.PORT}`;
    else if (environment === ENVIRONMENTS.DEV)
      this.url = process.env.DEV_APIPOOL_URL;
    else if (environment === ENVIRONMENTS.LIVE)
      this.url = process.env.LIVE_APIPOOL_URL;
  }

  private getServer(): Array<string> {
    const server = [this.url];

    if (this.environment === ENVIRONMENTS.LOCAL)
      server.push(SWAGGER_SERVERS.LOCAL);
    else if (this.environment === ENVIRONMENTS.DEV)
      server.push(SWAGGER_SERVERS.DEV);
    else if (this.environment === ENVIRONMENTS.LIVE)
      server.push(SWAGGER_SERVERS.LIVE);

    return server;
  }

  public build() {
    const [url, serverName] = this.getServer();
    const conf = new DocumentBuilder()
      .setTitle(Docs.title)
      .setDescription(Docs.desc)
      .setVersion(Docs.version)
      .addBearerAuth()
      .addServer(url, serverName)
      .setContact(author.name, author.website, author.email)
      .setLicense('MIT Licensed', Docs.license)
      .build();

    return conf;
  }

  public unauthResponseHandler(request: Request) {
    return new ApiResponse(
      ApiStatus.UNAUTH_ACCESS,
      'Invalid Credentials',
      request.ip || '0.0.0.0',
    );
  }

  public setupDefConfig() {
    return {
      customSiteTitle: 'Apipool docs',
      yamlDocumentUrl: process.env.API_YAML_REL_URL,
    };
  }
}
