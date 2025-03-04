import path from 'node:path';
import {readdir, unlink} from 'node:fs/promises';
import logger from './logger.js';
import config from '@/config/index.js';
import {streamRecordWorker} from '@/workers/stream-record-worker.js';

export const setupStreamRecordWorker = () => {
  const videoFolderPath = path.join(config.vodding.storageFolder.videos);

  (async () => {
    try {
      const files = await readdir(videoFolderPath);

      for (const file of files) {
        if (file.endsWith('.lock')) {
          unlink(path.join(videoFolderPath, file))
            .then(() => {
              logger.info(`Deleted .lock file: ${file}`);
            })
            .catch((error: unknown) => {
              logger.error('Error deleting file:', error);
            });
        }
      }
    } catch (error) {
      logger.error('Unable to scan directory:', error);
    }
  })();

  streamRecordWorker.on('ready', () => {
    logger.info('Stream record worker is ready');
  });

  streamRecordWorker.on('error', (error) => {
    logger.error('Stream record worker encountered an error:', error);
  });
};
