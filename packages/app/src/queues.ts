import { Queue } from "bullmq";
import config from "./config";

export const streamRecordQueue = new Queue("streamRecordQueue", {
  connection: config.vodding.redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "fixed",
      delay: 0.5 * 1000,
    },
  },
});
