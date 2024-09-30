import { chatClient } from "../../utils/twitchClient";
import logger from "../../utils/logger";
import type { ChatMessage } from "@twurple/chat";
import { orm } from "../../utils/MikroORM";
import type { EntityManager } from "@mikro-orm/postgresql";
import { ChatMessage as ChatMessageCl } from "../../entities/twitch/ChatMessage";
import { ChatController } from "../../controllers/chatController";

const listener = chatClient;
listener.connect();

// listener.onJoin((channel: string, user: string) => {
//   chatClient.say(channel, "hallo!");
// });
export const startLogChat = (channel: string) => {
  chatClient.join(channel);
  logger.debug(`Joined channel ${channel}`);
};
export const stoptLogChat = (channel: string) => {
  chatClient.part(channel);
  logger.debug(`Parted channel ${channel}`);
};

const logChannelListener = chatClient.onMessage(
  async (channel: string, user: string, text: string, msg: ChatMessage) => {
    const entityManager = (await orm).em;
    const chatController = new ChatController(entityManager);
    await chatController.handleIncomingMessage(channel, user, text, msg);
    logger.debug(`[${channel}] ${user}: ${text}`);
  }
);
