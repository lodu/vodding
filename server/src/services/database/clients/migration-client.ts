import {Migrator} from 'ts-migrate-mongoose';
import config from '@/config/index.js';
import logger from '@/utils/logger.js';

const migrationClient = {
  async connect(): Promise<void> {
    const migrator = await Migrator.connect({
      uri: (config as {vodding: {mongo: {mongoUri: string}}}).vodding.mongo
        .mongoUri,
      autosync: true,
    });

    logger.info('Running migrations...');

    // Await migrator
    //   .run("down", "test")
    //   .then((migrations) => {
    //     for (const migration of migrations) {
    //       logger.info("down:", migration.filename);
    //     }
    //   })
    //   .catch((error: unknown) => {
    //     logger.error(error);
    //   });

    // await migrator.prune();

    await migrator
      .run('up')
      .then((migrations) => {
        for (const migration of migrations) {
          logger.info('up:', migration.filename);
        }
      })
      .catch((error: unknown) => {
        logger.error(error);
      });

    await migrator.close();
  },
};

export default migrationClient;
