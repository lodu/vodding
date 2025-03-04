import path from 'node:path';
import fs from 'node:fs';
import {Worker, type Job} from 'bullmq';
import {spawn} from 'bun';
import logger from '@/utils/logger.js';
import config from '@/config/index.js';
import type {StreamQuality} from '@/types.js';

export type StreamJobData = {
  streamerName: string;
  quality: StreamQuality;
};

const streamRecordWorker = new Worker<StreamJobData>(
  'streamRecordQueue',
  async (job: Job<StreamJobData>) => {
    const {streamerName, quality} = job.data;
    const readableDate = new Date().toISOString().replaceAll(':', '_');
    const lockFilePath = path.join(
      config.vodding.storageFolder.videos,
      `.${streamerName}.lock`,
    );

    // Check if lock file exists
    if (fs.existsSync(lockFilePath)) {
      logger.warn(`Lock file for ${streamerName} already exists. Exiting job.`);
      return;
    }

    // Create lock file
    fs.writeFileSync(lockFilePath, '');

    const arguments_: string[] = [
      `twitch.tv/${streamerName}`,
      quality,
      '-o',
      path.join(
        config.vodding.storageFolder.videos,
        `${streamerName}-${readableDate}.mp4`,
      ),
      '-f',
    ];

    const streamlinkProcess = spawn(['streamlink', ...arguments_]);

    try {
      const code = await streamlinkProcess.exited;
      if (code !== 0) {
        logger.error(`Streamlink process exited with code ${code}`);
        throw new Error(`Streamlink process failed for ${streamerName}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Streamlink process error: ${error.message}`);
      } else {
        logger.error(`Streamlink process error: ${String(error)}`);
      }

      throw new Error(`Streamlink process failed for ${streamerName}`);
    } finally {
      // Remove lock file
      fs.unlinkSync(lockFilePath);
    }
  },
  {connection: config.vodding.redisConnection},
);

streamRecordWorker.on(
  'failed',
  (job: Job<StreamJobData> | undefined, error: Error) => {
    if (job) {
      logger.error(`Job ${job.id} failed with error ${error.message}`);
    } else {
      logger.error(`Job failed with error ${error.message}`);
    }
  },
);

export {streamRecordWorker};
