import type {HelixUser} from '@twurple/api/lib/endpoints/user/HelixUser.js';
import type {ChatMessage} from '@twurple/chat/lib/commands/ChatMessage.js';
import {chatClient} from '@/utils/twitch-client.js';
import logger from '@/utils/logger.js';
import {chatController} from '@/controllers/chat-controller.js';

const listener = chatClient;
listener.connect();

// Listener.onJoin((channel: string, user: string) => {
//   chatClient.say(channel, "hallo!");
// });
export const startLogChat = (user: HelixUser) => {
  const channelName = user.name;
  void chatClient.join(channelName);
  logger.debug(`Joined channel ${channelName}`);
};

export const stoptLogChat = (user: HelixUser) => {
  const channelName = user.name;
  chatClient.part(channelName);
  logger.debug(`Parted channel ${channelName}`);
};

chatClient.onMessage(
  async (channel: string, user: string, text: string, message: ChatMessage) => {
    await chatController.handleIncomingMessage(channel, user, text, message);
  },
);
