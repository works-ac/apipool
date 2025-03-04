import { AppController } from './app';
import { MiscController } from './utils/misc.utils.controller';
import { MonetoryController } from './utils/monetory.utils.controller';
import { NetworkingController } from './utils/networking.utils.controller';

export const CONTROLLERS = {
  AppController,
  UTILS: [NetworkingController, MiscController, MonetoryController],
};
