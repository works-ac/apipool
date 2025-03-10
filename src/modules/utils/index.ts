import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CONTROLLERS } from 'src/controllers';
import { CountryModel, StateModel } from 'src/db/models';

@Module({
  imports: [SequelizeModule.forFeature([CountryModel, StateModel])],
  controllers: CONTROLLERS.UTILS,
})
export class UtilsModule { }
