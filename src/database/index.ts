import { createConnection } from "typeorm";
import { User } from "../entity/User";

require("dotenv").config();
const prod = process.env.NODE;
const config: any = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  /*host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USERNAME || "postgres",
  password: process.env.TYPEORM_PASSWORD || "root",
  database: process.env.TYPEORM_DATABASE || "tasks",*/
  synchronize: true,
  ssl: true,
  tls: { rejectUnauthorized: false },
  entities: [User],
  migrations: ["src/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

createConnection(config).catch((error) => console.log(error));
