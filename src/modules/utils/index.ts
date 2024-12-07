import { Module } from '@nestjs/common';
import { CONTROLLERS } from 'src/controllers';

const { NetworkingController, MiscController } = CONTROLLERS.UTILS;
@Module({
  controllers: [NetworkingController, MiscController],
})
export class UtilsModule {}
