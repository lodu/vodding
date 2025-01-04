import { Worker, Job } from "bullmq";
import { spawn } from "bun";
import path from "path";
import fs from "fs";
import logger from "../utils/logger";
import config from "../config";
import type { StreamQuality } from "../types";

export interface StreamJobData {
  streamerName: string;
  quality: StreamQuality;
}

const streamRecordWorker = new Worker<StreamJobData>(
  "streamRecordQueue",
  async (job: Job<StreamJobData>) => {
    const { streamerName, quality } = job.data;
    const readableDate = new Date().toISOString().replace(/:/g, "_");
    const lockFilePath = path.join(config.vodding.storageFolder.videos, `.${streamerName}.lock`);

    // Check if lock file exists
    if (fs.existsSync(lockFilePath)) {
      logger.warn(`Lock file for ${streamerName} already exists. Exiting job.`);
      return;
    }

    // Create lock file
    fs.writeFileSync(lockFilePath, "");

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

    try {
      const code = await streamlinkProcess.exited;
      if (code !== 0) {
        logger.error(`Streamlink process exited with code ${code}`);
        throw new Error(`Streamlink process failed for ${streamerName}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Streamlink process error: ${err.message}`);
      } else {
        logger.error(`Streamlink process error: ${String(err)}`);
      }
      throw new Error(`Streamlink process failed for ${streamerName}`);
    } finally {
      // Remove lock file
      fs.unlinkSync(lockFilePath);
    }
  },
  { connection: config.vodding.redisConnection },
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

export { streamRecordWorker };