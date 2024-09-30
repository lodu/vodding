import { EventSubWsListener } from "@twurple/eventsub-ws";
import { twitchClient } from "../../utils/twitchClient";
import logger from "../../utils/logger";
import { startStreamRecording } from "../streamService";
import type { StreamOnlineEvent } from "../../types/twitchTypes";
import type { StartStreamRecording } from "../../types/streamTypes";
import { getUserIdByUsername } from "./apiService";
import { startLogChat, stoptLogChat } from "./chatService";

const listener = new EventSubWsListener({
  apiClient: twitchClient,
});

const createListener = (userId: string) => {
  listener.onStreamOnline(userId, (event) => {
    const streamerName = event.broadcasterDisplayName;
    startLogChat(streamerName);
    logger.debug(`${streamerName} just went live! Starting recording...`);

    const recordingConfig: StartStreamRecording = {
      streamerName: event.broadcasterDisplayName,
      quality: "best",
    };

    startStreamRecording(recordingConfig);
  });
  listener.onStreamOffline(userId, (event) => {
    const streamerName = event.broadcasterDisplayName;
    stoptLogChat(streamerName);
    logger.debug(`${streamerName} just went offline! Stopped logging chat...`);
  });
};

export const setupTwitchListeners = async () => {
  try {
    const recordingNames = ["marklahhh", "ginandos"];
    recordingNames.forEach(async (name: string) => {
      await getUserIdByUsername(name)
        .then((userId) => {
          userId
            ? createListener(userId)
            : logger.error(
                `Error setting up Twitch EventSub WebSocket listener for ${name}: cannot find id`
              );
        })
        .catch((e: any) => {
          logger.error(e);
        });
    });

    listener.start();
    logger.info("Twitch EventSub WebSocket listener set up and listening");
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `Error setting up Twitch EventSub WebSocket listener: ${error.message}`
      );
    } else {
      logger.error(
        "Unexpected error setting up Twitch EventSub WebSocket listener"
      );
    }
  }
};
