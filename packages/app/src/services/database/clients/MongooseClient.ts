import mongoose, {
  Mongoose,
  MongooseError,
  type ConnectOptions,
} from "mongoose";
import cache from "ts-cache-mongoose";
import config from "../../../config";
import logger from "../../../utils/logger";

const mongooseOptions: ConnectOptions = {
  autoIndex: true,
};

if (config.vodding.mongo.cache.enabled) {
  cache.init(mongoose, {
    defaultTTL: config.vodding.mongo.cache.ttl,
    engine: "redis",
    engineOptions: {
      host: config.vodding.redisConnection.host,
      port: config.vodding.redisConnection.port,
    },
    debug: config.environment === "development" ? true : false,
  });
}

mongoose.connection.on("error", (error: MongooseError) => {
  logger.error(error.message);
});

mongoose.connection.on("connecting", () => {
  logger.info("Connecting to MongoDB...");
});

mongoose.connection.on("connected", () => {
  logger.info("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  logger.info("Disconnected from MongoDB");
});

mongoose.connection.on("reconnect", () => {
  logger.info("Reconnecting to MongoDB...");
});

export default {
  connect: async (): Promise<Mongoose> => {
    await mongoose.connect(config.vodding.mongo.mongoUri, mongooseOptions);
    return mongoose;
  },
  isConnected: (): boolean => Number(mongoose.connection.readyState) === 1,
};
