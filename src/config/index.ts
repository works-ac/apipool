import { PostgresDatabaseConfig } from './database.config';
import { SwaggerConf } from './swagger.config';

export const Configurations = {
  Swagger: SwaggerConf,
  Database: { PostgresDatabaseConfig },
};
