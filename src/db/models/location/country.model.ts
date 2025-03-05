import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Max,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TableNames } from 'src/i18n';

@Table({ tableName: TableNames.COUNTRY, timestamps: true })
export class CountryModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  sr_no: number;

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
}
