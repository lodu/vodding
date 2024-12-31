import logger from "../utils/logger";
import type { StartStreamRecording } from "../types/streamTypes";
export const startStreamRecording = async ({
  streamerName,
  quality,
}: StartStreamRecording) => {
  const readableDate = new Date().toISOString().replace(/:/g, "_");
  const command = "streamlink";
  const args = [
    `twitch.tv/${streamerName}`,
    quality,
    "-o",
    `./recordings/${streamerName}-${readableDate}.mp4`,
    "-f",
  ];
  console.error(args);

  try {
    const process = Bun.spawn({
      cmd: [command, ...args],
      stdout: "pipe",
      stderr: "pipe",
    });

    process.stdout?.pipeTo(
      new WritableStream({
        write(chunk) {
          logger.debug(`Streamlink stdout: ${new TextDecoder().decode(chunk)}`);
        },
      }),
    );

    process.stderr?.pipeTo(
      new WritableStream({
        write(chunk) {
          logger.warn(`Streamlink stderr: ${new TextDecoder().decode(chunk)}`);
        },
      }),
    );

    const exitCode = await process.exited;
    if (exitCode === 0) {
      logger.info(
        `Streamlink process completed successfully for streamer: ${streamerName}`,
      );
    } else {
      logger.error(
        `Streamlink process failed for streamer: ${streamerName} with exit code: ${exitCode}`,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error starting Streamlink: ${error.message}`);
    } else {
      logger.error(`Unexpected error starting Streamlink: ${error}`);
    }
  }
};
