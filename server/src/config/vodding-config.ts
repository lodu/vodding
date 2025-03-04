import fs from 'node:fs';
import type {RedisOptions} from 'ioredis';
import type {CacheTTL} from 'ts-cache-mongoose';
import {getEnvVariable} from '@/utils/config.js';

export type VoddingConfig = {
  basePath: string;
  mongo: MongoConfig;
  redisConnection: RedisOptions;
  storageFolder: {
    chat: string;
    videos: string;
  };
};

type MongoConfig = {
  mongoUri: string;
  cache: {
    enabled: boolean;
    ttl: CacheTTL;
  };
};

export const mongoConfig: MongoConfig = {
  mongoUri: `${getEnvVariable('MONGO_URI')}`,
  cache: {
    enabled: true,
    ttl: '5 minutes',
  },
};

export const queueConnection: RedisOptions = {
  host: 'redis',
  port: 6379,
};

const voddingConfig: VoddingConfig = {
  mongo: mongoConfig,
  basePath: getEnvVariable('BASE_PATH', '/app'),
  redisConnection: queueConnection,
  storageFolder: {
    chat: `${getEnvVariable('DATASTORE_FOLDER')}chat/`,
    videos: `${getEnvVariable('DATASTORE_FOLDER')}videos/`,
  },
};

export default voddingConfig;
