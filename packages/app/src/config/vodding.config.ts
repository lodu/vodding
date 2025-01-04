import type { RedisOptions } from "ioredis";
import fs from "fs";
import { getEnvVar } from "../utils/config";

export interface VoddingConfig {
  mongo: MongoConfig;
  redisConnection: RedisOptions;
  storageFolder: {
    chat: string;
    videos: string;
  };
}

interface MongoConfig {
  mongoUri: string;
  cache: {
    enabled: boolean;
    ttl: string;
  };
}

export const mongoConfig: MongoConfig = {
  mongoUri: `${getEnvVar("MONGO_URI")}`,
  cache: {
    enabled: true,
    ttl: "5 minutes",
  },
};

export const queueConnection: RedisOptions = {
  host: "redis",
  port: 6379,
};

const voddingConfig: VoddingConfig = {
  mongo: mongoConfig,
  redisConnection: queueConnection,
  storageFolder: {
    chat: `${getEnvVar("DATASTORE_FOLDER")}chat/`,
    videos: `${getEnvVar("DATASTORE_FOLDER")}videos/`,
  },
};

export default voddingConfig;
