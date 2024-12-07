import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { MODULES } from 'src/modules';
import { Packages } from 'src/packages';
import { SwaggerModule } from '@nestjs/swagger';
import { Configurations } from 'src/config';
import { ENVIRONMENTS } from 'src/constant';

const auth = require('express-basic-auth');

export async function bootstrap() {
  const { EXCEPTIONS } = Packages;
  const { AppModule } = MODULES;
  const { Swagger } = Configurations;
  const environment = (process.env.NODE_ENV ||
    ENVIRONMENTS.LOCAL) as ENVIRONMENTS;
  const conf = new Swagger(environment);

  const app = await NestFactory.create(AppModule, { logger: false });
  const document = SwaggerModule.createDocument(app, conf.build());
  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'User-Agent'],
    // exposedHeaders: 'Content-Type',
  });
  app.use((request: Request, response: Response, next: NextFunction) => {
    request.app.set('trust proxy', true);
    next();
  });
  app.useGlobalFilters(new EXCEPTIONS.GeneralException());
  app.use(
    '/api-docs',
    auth({
      users: {
        [process.env.API_DEF_AUTH_USER]: process.env.API_DEF_AUTH_PASS,
      },
      challenge: true,
      unauthorizedResponse: conf.unauthResponseHandler,
    }),
  );

  SwaggerModule.setup('api-docs', app, document, conf.setupDefConfig());

  return app;
}
