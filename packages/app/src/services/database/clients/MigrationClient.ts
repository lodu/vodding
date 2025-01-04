import Migrator from "ts-migrate-mongoose";
import config from "../../../config";
import logger from "../../../utils/logger";

export default {
  connect: async (): Promise<void> => {
    const migrator = await Migrator.connect({
      uri: config.vodding.mongo.mongoUri,
      autosync: true,
    });

    logger.info("Running migrations...");

    // await migrator
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
      .run("up")
      .then((migrations) => {
        for (const migration of migrations) {
          logger.info("up:", migration.filename);
        }
      })
      .catch((error: unknown) => {
        logger.error(error);
      });

    await migrator.close();
  },
};
