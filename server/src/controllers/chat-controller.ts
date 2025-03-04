/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {
  VoddingTwitchChatMessage,
  VoddingTransmittedTwitchChatMessage,
} from '@common/chatTypes.js';
import type {ChatMessage} from '@twurple/chat/lib/commands/ChatMessage.js';
import twitchChatMessageService from '@/services/database/twitch-chat-message-service.js';
import twitchApiService from '@/services/twitch/api-service.js';
import {getIo} from '@/websockets/socket.js';

const mapTwitchChatMessageToVoddingTwitchChatMessage = async (
  message: ChatMessage,
): Promise<VoddingTwitchChatMessage> => {
  const user = await twitchApiService.getUserByUsername(
    message.userInfo.userName,
  );
  return {
    id: message.id,
    date: message.date,
    userInfo: {
      userId: message.userInfo.userId,
      userName: message.userInfo.userName,
      displayName: message.userInfo.displayName,
      isMod: message.userInfo.isMod,
      isSubscriber: message.userInfo.isSubscriber,
      isBroadcaster: message.userInfo.isBroadcaster,
      badges: message.userInfo.badges,
      badgeInfo: message.userInfo.badgeInfo,
      isFounder: message.userInfo.isFounder,
      isVip: message.userInfo.isVip,
      isArtist: message.userInfo.isArtist,
      profilePictureUrl: user.profilePictureUrl,
    },
    channelId: message.channelId,
    isCheer: message.isCheer,
    isRedemption: message.isRedemption,
    rewardId: message.rewardId,
    isFirst: message.isFirst,
    isReturningChatter: message.isReturningChatter,
    isHighlight: message.isHighlight,
    isReply: message.isReply,
    parentMessageId: message.parentMessageId,
    parentMessageText: message.parentMessageText,
    parentMessageUserId: message.parentMessageUserId,
    parentMessageUserName: message.parentMessageUserName,
    parentMessageUserDisplayName: message.parentMessageUserDisplayName,
    threadMessageId: message.threadMessageId,
    threadMessageUserId: message.threadMessageUserId,
    bits: message.bits,
    emoteOffsets: message.emoteOffsets
      ? new Map<string, string[]>(message.emoteOffsets.entries())
      : new Map(),
    isHypeChat: message.isHypeChat,
    hypeChatAmount: message.hypeChatAmount,
    hypeChatDecimalPlaces: message.hypeChatDecimalPlaces,
    hypeChatLocalizedAmount: message.hypeChatLocalizedAmount,
    hypeChatCurrency: message.hypeChatCurrency,
    hypeChatLevel: message.hypeChatLevel,
    hypeChatIsSystemMessage: message.hypeChatIsSystemMessage,
  };
};

class ChatController {
  async handleIncomingMessage(
    channel: string,
    user: string,
    text: string,
    message_: ChatMessage,
  ): Promise<void> {
    const message =
      await mapTwitchChatMessageToVoddingTwitchChatMessage(message_);

    const transmittedMessage: VoddingTransmittedTwitchChatMessage = {
      channel,
      user,
      text,
      voddingMsg: message,
    };

    getIo().to(channel).emit('TwitchChatMessage', transmittedMessage);

    await twitchChatMessageService.saveTwitchChatMessage(message);
  }
}

export const chatController = new ChatController();
