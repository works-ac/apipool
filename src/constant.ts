import { BASE_URL } from './api';

export enum CONTROLLER_URLS {
  APP_CONTROLLER = `${BASE_URL}/`,
}

export enum SWAGGER_SERVERS {
  LOCAL = 'Local Server',
  DEV = 'Development Server',
  LIVE = 'Live Server',
}

export enum ENVIRONMENTS {
  LOCAL = 'local',
  DEV = 'development',
  LIVE = 'production',
}

export const TEST_SUITES_TIMEOUT = 30000;
export const REGEX = {
  IP: /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/,
  CLASS_A_IP: /^(10\.\d{1,3}\.\d{1,3}\.\d{1,3})$/,
  CLASS_B_IP: /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/,
  CLASS_C_IP: /^192\.168\.\d{1,3}\.\d{1,3}$/,
};
export const CURRENCY_NOTES = [500, 200, 100, 50, 20, 10, 5, 2, 1];
