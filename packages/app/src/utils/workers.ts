import config from "../config";
import { streamRecordWorker } from "../workers/streamRecordWorker";
import path from "path";
import logger from "./logger";
const fs = require("fs");

export const setupStreamRecordWorker = () => {
  const videoFolderPath = path.join(config.vodding.storageFolder.videos);

  fs.readdir(
    videoFolderPath,
    (err: NodeJS.ErrnoException | null, files: string[]) => {
      if (err) {
        logger.error("Unable to scan directory:", err);
        return;
      }

      files.forEach((file: string) => {
        if (file.endsWith(".lock")) {
          fs.unlink(
            path.join(videoFolderPath, file),
            (err: NodeJS.ErrnoException | null) => {
              if (err) {
                logger.error("Error deleting file:", err);
              } else {
                logger.info(`Deleted .lock file: ${file}`);
              }
            },
          );
        }
      });
    },
  );

  streamRecordWorker.on("ready", () => {
    logger.info("Stream record worker is ready");
  });

  streamRecordWorker.on("error", (err) => {
    logger.error("Stream record worker encountered an error:", err);
  });
};
