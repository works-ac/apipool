import { BASE_URL } from './api';

export enum CONTROLLER_URLS {
  APP_CONTROLLER = `${BASE_URL}/`,
}

export enum SWAGGER_SERVERS {
  LOCAL = 'Local Server',
  DEV = 'Development Server',
  LIVE = 'Live Server',
}
