import {streamRecordQueue} from '@/queues.js';
import logger from '@/utils/logger.js';
import type {StreamJobData} from '@/workers/stream-record-worker.js';

export const startStreamRecording = async (streamerName: string) => {
  const jobData: StreamJobData = {
    streamerName,
    quality: 'best',
  };
  logger.info(`Adding stream record job for ${streamerName}`);
  await streamRecordQueue.add(`streamRecord ${streamerName}`, jobData);
};
