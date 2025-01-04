import { streamRecordQueue } from "../queues";
import logger from "../utils/logger";
import type { StreamJobData } from "../workers/streamRecordWorker";

export const startStreamRecording = async (streamerName: string) => {
  const jobData: StreamJobData = {
    streamerName: streamerName,
    quality: "best",
  };
  logger.info(`Adding stream record job for ${streamerName}`);
  await streamRecordQueue.add(`streamRecord ${streamerName}`, jobData);
};
