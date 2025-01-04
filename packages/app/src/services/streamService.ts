import logger from "../utils/logger";
import { spawn } from "bun";
import config from "../config";
import * as path from "path";
import { streamRecordQueue } from "../queues";
import type { StreamJobData } from "../workers/streamRecordWorker";

export const startStreamRecording = async (streamerName: string) => {
  const jobData: StreamJobData = {
    streamerName: streamerName,
    quality: "best",
  };
  await streamRecordQueue.add("streamRecord", jobData);
};
