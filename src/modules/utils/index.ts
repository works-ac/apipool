import { Module } from '@nestjs/common';
import { CONTROLLERS } from 'src/controllers';

@Module({
  controllers: CONTROLLERS.UTILS,
})
export class UtilsModule {}
