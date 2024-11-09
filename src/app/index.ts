import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { MODULES } from 'src/modules';
import { Packages } from 'src/packages';
import { SwaggerModule } from '@nestjs/swagger';
import { Configurations } from 'src/config';

export async function bootstrap() {
  const { EXCEPTIONS } = Packages;
  const { AppModule } = MODULES;

  const app = await NestFactory.create(AppModule, {
    logger: false,
    cors: true,
  });
  const document = SwaggerModule.createDocument(app, Configurations.swagger);

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
