import { EventSubWsListener } from "@twurple/eventsub-ws";
import { twitchClient } from "../../utils/twitchClient";
import logger from "../../utils/logger";
import { getUserByUsername } from "./apiService";
import { startLogChat } from "./chatService";
import { startStreamRecording } from "../streamService";

const listener = new EventSubWsListener({
  apiClient: twitchClient,
});

const createListener = async (userName: string, record: boolean) => {
  const user = await getUserByUsername(userName);

  startLogChat(user);
  if (!record) return;
  listener.onStreamOnline(user, (event) => {
    const streamerName = event.broadcasterDisplayName;
    logger.debug(`${streamerName} just went live! Starting recording...`);
    startStreamRecording(streamerName);
  });

  // Check if the stream is already live
  const stream = await twitchClient.streams.getStreamByUserId(user.id);
  if (stream) {
    logger.debug(`${user.displayName} is already live! Starting recording...`);
    startStreamRecording(user.displayName);
  }
};

export const setupTwitchListeners = async (record = true) => {
  try {
    const recordingNames = ["marklahhh"];

    recordingNames.forEach(async (name: string) => {
      await createListener(name, record)
        .then(() => {
          logger.info(`Twitch EventSub WebSocket listener set up for ${name}`);
        })
        .catch((e: any) => {
          logger.error(
            `Error setting up Twitch EventSub WebSocket listener for ${name}: ${e.message}`,
          );
        });
    });

    listener.start();
    logger.info("Twitch EventSub WebSocket listener set up and listening");
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `Error setting up Twitch EventSub WebSocket listener: ${error.message}`,
      );
    } else {
      logger.error(
        "Unexpected error setting up Twitch EventSub WebSocket listener",
      );
    }
  }
};
