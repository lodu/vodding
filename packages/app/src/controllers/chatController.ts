import * as fs from "fs";
import * as path from "path";
import type { ChatMessage } from "@twurple/chat";
import { io } from "../websockets/socket";
import logger from "../utils/logger";
import type {
  TransmittedChatMessage,
  VoddingChatUser,
  VoddingChatMessage,
} from "@vodding/common/chatTypes";
import { getUserByUsername } from "../services/twitch/apiService";
import saveChatMessage from "../services/database/chatMessageService";

const mapChatMessageToVoddingChatMessage = async (
  msg: ChatMessage,
): Promise<VoddingChatMessage> => {
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
      profilePictureUrl: await getUserByUsername(msg.userInfo.userName).then(
        (user) => user.profilePictureUrl,
      ),
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
    const message = await mapChatMessageToVoddingChatMessage(msg);

    const transmittedMsg: TransmittedChatMessage = {
      channel,
      user,
      text,
      voddingMsg: message,
    };

    io.to(channel).emit("chatMessage", transmittedMsg);

    await saveChatMessage(message);
  }
}

export const chatController = new ChatController();
