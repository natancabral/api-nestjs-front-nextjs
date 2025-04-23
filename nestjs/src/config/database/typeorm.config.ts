// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-require-imports
require("dotenv").config();
import { MySqlDriver } from "@mikro-orm/mysql";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import EnvHelper from "@root/common/helpers/env.helper";
import { UserEntity } from "@root/modules/repositories/user/entities/user.entity";

const DatabaseType = {
  mysql: MySqlDriver,
  postgres: PostgreSqlDriver,
};

export const typeOrmConfig = {
  driver:
    DatabaseType[
      EnvHelper.getString("DATABASE_TYPE") as keyof typeof DatabaseType
    ],
  dbName: EnvHelper.getString("DATABASE_NAME"),
  host: EnvHelper.getString("DATABASE_HOST"),
  port: EnvHelper.getNumber("DATABASE_PORT"),
  user: EnvHelper.getString("DATABASE_USERNAME"),
  password: EnvHelper.getString("DATABASE_PASSWORD"),
  entities: [UserEntity],
  autoLoadEntities: false,
  debug: true,
  migrations: {
    path: "./dist/migrations",
    pathTs: "./migrations",
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};

export default typeOrmConfig;
