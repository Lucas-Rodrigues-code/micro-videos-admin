import { config as readEnv } from "dotenv";
import path, { join } from "path";

export class Config {
  static env: any = null;

  static db() {
    return {
      dialect: "sqlite" as any,
      host: Config.env.DB_HOST,
      logging: Config.env.DB_LOGGING === "true",
    };
  }

  static readEnv() {
    if (Config.env) {
      return;
    }

    Config.env = readEnv({
      path: join(__dirname, `../../../.envs.${process.env.NODE_ENV}`),
    }).parsed;
  }
}
