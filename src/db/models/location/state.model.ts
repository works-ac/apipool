import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Max, Model, PrimaryKey, Table } from "sequelize-typescript";
import { TableNames } from "src/i18n";
import { CountryModel } from "./country.model";

@Table({ tableName: TableNames.STATES, timestamps: true })
export class StateModel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    state_id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @ForeignKey(() => CountryModel)
    @Column(DataType.BIGINT)
    country: number;

    @Max(10)
    @AllowNull
    @Column(DataType.STRING)
    state_code: string;

    @AllowNull
    @Column(DataType.STRING)
    latitude: string

    @AllowNull
    @Column(DataType.STRING)
    longitude: string
}