import { Module } from '@nestjs/common';
import { CONTROLLERS } from 'src/controllers';
import { UtilsModule } from '../utils';
import { Helpers } from 'src/helpers';
import { SequelizeModule } from '@nestjs/sequelize';

const config = Helpers.getPsqlDbConfig();

@Module({
  controllers: [CONTROLLERS.AppController],
  imports: [SequelizeModule.forRoot(config), UtilsModule],
  exports: [SequelizeModule],
})
export class AppModule {}
