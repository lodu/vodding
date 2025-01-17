import { chatClient } from "../../utils/twitchClient";
import logger from "../../utils/logger";
import type { ChatMessage } from "@twurple/chat";

import type { HelixUser } from "@twurple/api";
import { chatController } from "../../controllers/ChatController";

const listener = chatClient;
listener.connect();

// listener.onJoin((channel: string, user: string) => {
//   chatClient.say(channel, "hallo!");
// });
export const startLogChat = (user: HelixUser) => {
  const channelName = user.name;
  chatClient.join(channelName);
  logger.debug(`Joined channel ${channelName}`);
};
export const stoptLogChat = (user: HelixUser) => {
  const channelName = user.name;
  chatClient.part(channelName);
  logger.debug(`Parted channel ${channelName}`);
};

chatClient.onMessage(
  async (channel: string, user: string, text: string, msg: ChatMessage) => {
    await chatController.handleIncomingMessage(channel, user, text, msg);
  },
);
