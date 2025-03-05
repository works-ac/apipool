import { Dialect } from 'sequelize';
import { DbConstants } from 'src/i18n';

export class PostgresDatabaseConfig {
  private readonly dbDialect: string;
  constructor(
    private readonly host: string,
    private readonly dbPort: number,
    private readonly dbUsername: string,
    private readonly dbPassword: string,
    private readonly databaseName: string,
  ) {
    this.dbDialect = DbConstants.DB_DIALECT;
  }

  public get DB_HOST(): string {
    return this.host;
  }

  public get DB_PORT(): number {
    return this.dbPort;
  }

  public get DB_USERNAME(): string {
    return this.dbUsername;
  }

  public get DB_PASSWORD(): string {
    return this.dbPassword;
  }

  public get DB_NAME(): string {
    return this.databaseName;
  }

  public get DB_DIALECT(): Dialect {
    return this.dbDialect as Dialect;
  }
}
