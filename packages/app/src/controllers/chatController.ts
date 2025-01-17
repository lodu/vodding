import * as fs from "fs";
import * as path from "path";
import { io } from "../websockets/socket";
import logger from "../utils/logger";
import type {
  VoddingTransmittedTwitchChatMessage,
  VoddingTwitchChatMessage,
} from "@vodding/common/chatTypes";
import TwitchChatMessageService from "../services/database/twitchChatMessageService";
import TwitchApiService from "../services/twitch/apiService";
import type { ChatMessage } from "@twurple/chat";

const mapTwitchChatMessageToVoddingTwitchChatMessage = async (
  msg: ChatMessage,
): Promise<VoddingTwitchChatMessage> => {
  return {
    id: msg.id,
    date: msg.date,
    userInfo: {
      userId: msg.userInfo.userId,
      userName: msg.userInfo.userName,
      displayName: msg.userInfo.displayName,
      isMod: msg.userInfo.isMod,
      isSubscriber: msg.userInfo.isSubscriber,
      isBroadcaster: msg.userInfo.isBroadcaster,
      badges: msg.userInfo.badges,
      badgeInfo: msg.userInfo.badgeInfo,
      isFounder: msg.userInfo.isFounder,
      isVip: msg.userInfo.isVip,
      isArtist: msg.userInfo.isArtist,
      profilePictureUrl: (
        await TwitchApiService.getUserByUsername(msg.userInfo.userName)
      ).profilePictureUrl,
    },
    channelId: msg.channelId,
    isCheer: msg.isCheer,
    isRedemption: msg.isRedemption,
    rewardId: msg.rewardId,
    isFirst: msg.isFirst,
    isReturningChatter: msg.isReturningChatter,
    isHighlight: msg.isHighlight,
    isReply: msg.isReply,
    parentMessageId: msg.parentMessageId,
    parentMessageText: msg.parentMessageText,
    parentMessageUserId: msg.parentMessageUserId,
    parentMessageUserName: msg.parentMessageUserName,
    parentMessageUserDisplayName: msg.parentMessageUserDisplayName,
    threadMessageId: msg.threadMessageId,
    threadMessageUserId: msg.threadMessageUserId,
    bits: msg.bits,
    emoteOffsets: new Map(msg.emoteOffsets.entries()),
    isHypeChat: msg.isHypeChat,
    hypeChatAmount: msg.hypeChatAmount,
    hypeChatDecimalPlaces: msg.hypeChatDecimalPlaces,
    hypeChatLocalizedAmount: msg.hypeChatLocalizedAmount,
    hypeChatCurrency: msg.hypeChatCurrency,
    hypeChatLevel: msg.hypeChatLevel,
    hypeChatIsSystemMessage: msg.hypeChatIsSystemMessage,
  };
};

class ChatController {
  async handleIncomingMessage(
    channel: string,
    user: string,
    text: string,
    msg: ChatMessage,
  ): Promise<void> {
    const message = await mapTwitchChatMessageToVoddingTwitchChatMessage(msg);

    const transmittedMsg: VoddingTransmittedTwitchChatMessage = {
      channel,
      user,
      text,
      voddingMsg: message,
    };

    io.to(channel).emit("TwitchChatMessage", transmittedMsg);

    await TwitchChatMessageService.saveTwitchChatMessage(message);
  }
}

export const chatController = new ChatController();
