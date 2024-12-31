import { env } from "bun";

interface DatabaseConfig {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

interface TwitchConfig {
  oAuth: string;
  clientId: string;
  clientSecret: string;
  accessToken: string;
  nick: string;
}
interface DatastoreConfig {
  folder: string;
}

interface Config {
  serverPort: number;
  twitch: TwitchConfig;
  database: DatabaseConfig;
  datastore: DatastoreConfig;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = env[key];
  if (value === undefined || value === "") {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

const config: Config = {
  serverPort: parseInt(getEnvVar("SERVER_PORT", "3000"), 10),
  twitch: {
    oAuth: getEnvVar("TWITCH_OAUTH"),
    clientId: getEnvVar("TWITCH_CLIENT_ID"),
    clientSecret: getEnvVar("TWITCH_CLIENT_SECRET"),
    accessToken: getEnvVar("TWITCH_ACCESS_TOKEN"),
    nick: getEnvVar("TWITCH_IRC_NICK"),
  },
  database: {
    name: getEnvVar("DATABASE_NAME"),
    host: getEnvVar("DATABASE_HOST"),
    port: parseInt(getEnvVar("DATABASE_PORT", "5432")),
    user: getEnvVar("DATABASE_USER"),
    password: getEnvVar("DATABASE_PASSWORD"),
  },
  datastore: {
    folder: getEnvVar("DATASTORE_FOLDER"),
  },
};

export default config;
