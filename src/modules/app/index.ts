import { Module } from '@nestjs/common';
import { CONTROLLERS } from 'src/controllers';
import { UtilsModule } from '../utils';

@Module({ controllers: [CONTROLLERS.AppController], imports: [UtilsModule] })
export class AppModule {}
