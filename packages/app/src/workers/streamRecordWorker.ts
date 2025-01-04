import { Worker, Job } from "bullmq";
import { spawn } from "bun";
import path from "path";

import logger from "../utils/logger";
import config from "../config";
import type { StreamQuality } from "../types";

export interface StreamJobData {
  streamerName: string;
  quality: StreamQuality;
}

const streamRecordWorker = new Worker<StreamJobData>(
  "streamRecord",
  async (job: Job<StreamJobData>) => {
    const { streamerName, quality } = job.data;
    const readableDate = new Date().toISOString().replace(/:/g, "_");
    const args: string[] = [
      `twitch.tv/${streamerName}`,
      quality,
      "-o",
      path.join(
        config.vodding.storageFolder.videos,
        `${streamerName}-${readableDate}.mp4`,
      ),
      "-f",
    ];

    const streamlinkProcess = spawn(["streamlink", ...args]);

    streamlinkProcess.exited
      .then((code) => {
        if (code !== 0) {
          logger.error(`Streamlink process exited with code ${code}`);
          throw new Error(`Streamlink process failed for ${streamerName}`);
        }
      })
      .catch((err: Error) => {
        logger.error(`Streamlink process error: ${err.message}`);
        throw new Error(`Streamlink process failed for ${streamerName}`);
      });
  },
  { connection: config.vodding.queueConnection },
);

streamRecordWorker.on(
  "failed",
  (job: Job<StreamJobData> | undefined, err: Error) => {
    if (job) {
      logger.error(`Job ${job.id} failed with error ${err.message}`);
    } else {
      logger.error(`Job failed with error ${err.message}`);
    }
  },
);
