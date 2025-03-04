import mongoose, {
  type Mongoose,
  type MongooseError,
  type ConnectOptions,
} from 'mongoose';
import cache from 'ts-cache-mongoose';
import config from '@/config/index.js';
import logger from '@/utils/logger.js';

const mongooseOptions: ConnectOptions = {
  autoIndex: true,
};

if (config.vodding.mongo.cache.enabled) {
  cache.init(mongoose, {
    defaultTTL: config.vodding.mongo.cache.ttl, // eslint-disable-line @typescript-eslint/naming-convention
    engine: 'redis',
    engineOptions: {
      host: config.vodding.redisConnection.host,
      port: config.vodding.redisConnection.port,
    },
    // Debug: config.environment === "development" ? true : false,
  });
}

mongoose.connection.on('error', (error: MongooseError) => {
  logger.error(error.message);
});

mongoose.connection.on('connecting', () => {
  logger.info('Connecting to MongoDB...');
});

mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB');
});
mongoose.connection.on('disconnected', () => {
  logger.info('Disconnected from MongoDB');
});

mongoose.connection.on('reconnect', () => {
  logger.info('Reconnecting to MongoDB...');
});

const mongooseClient = {
  async connect(): Promise<Mongoose> {
    await mongoose.connect(config.vodding.mongo.mongoUri, mongooseOptions);
    return mongoose;
  },
  isConnected: (): boolean => Number(mongoose.connection.readyState) === 1,
};

export default mongooseClient;
