import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Max,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TableNames } from 'src/i18n';
import { StateModel } from './state.model';

@Table({ tableName: TableNames.COUNTRY, timestamps: true })
export class CountryModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  country_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Max(5)
  @Column(DataType.STRING)
  dial_code: string;

  @AllowNull(false)
  @Max(5)
  @Column(DataType.STRING)
  code: string;

  @HasMany(() => StateModel)
  states: StateModel[];
}
