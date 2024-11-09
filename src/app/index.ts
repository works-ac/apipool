import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { MODULES } from 'src/modules';
import { Packages } from 'src/packages';
import { SwaggerModule } from '@nestjs/swagger';
import { Configurations } from 'src/config';
import { ENVIRONMENTS } from 'src/constant';

export async function bootstrap() {
  const { EXCEPTIONS } = Packages;
  const { AppModule } = MODULES;
  const { Swagger } = Configurations;
  const environment = (process.env.NODE_ENV ||
    ENVIRONMENTS.LOCAL) as ENVIRONMENTS;
  const conf = new Swagger(environment);

  const app = await NestFactory.create(AppModule, { logger: false });
  const document = SwaggerModule.createDocument(app, conf.build());
  app.enableCors({ origin: '*', credentials: true });
  app.use((request: Request, response: Response, next: NextFunction) => {
    request.app.set('trust proxy', true);
    next();
  });
  app.useGlobalFilters(new EXCEPTIONS.GeneralException());
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'Apipool docs',
    yamlDocumentUrl: 'api-docs/yaml',
  });

  return app;
}
