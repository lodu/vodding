import logger from "../../utils/logger";
import { getOrCreateUser } from "./chatUserService";
import type { IChatMessage, IChatUser, IUserDynamicFields } from "./interfaces";
import ChatMessageModel from "./models/ChatMessage";
import type { VoddingChatMessage } from "@vodding/common/chatTypes";

export interface ChatMessageFilter {
  id?: string;
  date?: { $gte?: Date; $lte?: Date };
  channelId?: string | null;
  isCheer?: boolean;
  isRedemption?: boolean;
  rewardId?: string | null;
  isFirst?: boolean;
  isReturningChatter?: boolean;
  isHighlight?: boolean;
  isReply?: boolean;
  parentMessageId?: string | null;
  parentMessageText?: string | null;
  parentMessageUserId?: string | null;
  parentMessageUserName?: string | null;
  threadMessageId?: string | null;
  threadMessageUserId?: string | null;
  bits?: { $gte?: number; $lte?: number };
  isHypeChat?: boolean;
  hypeChatAmount?: number | null;
  hypeChatDecimalPlaces?: number | null;
  hypeChatLocalizedAmount?: number | null;
  hypeChatCurrency?: string | null;
  hypeChatLevel?: number | null;
  hypeChatIsSystemMessage?: boolean | null;
  authorId: string;
}
async function createChatMessageModelFromMessage(
  message: VoddingChatMessage,
): Promise<IChatMessage> {
  const userInfo = await getOrCreateUser(message);

  return {
    id: message.id,
    date: message.date,
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
    emoteOffsets: message.emoteOffsets,
    isHypeChat: message.isHypeChat ?? false,
    hypeChatAmount: message.hypeChatAmount,
    hypeChatDecimalPlaces: message.hypeChatDecimalPlaces,
    hypeChatLocalizedAmount: message.hypeChatLocalizedAmount,
    hypeChatCurrency: message.hypeChatCurrency,
    hypeChatLevel: message.hypeChatLevel,
    hypeChatIsSystemMessage: message.hypeChatIsSystemMessage ?? false,
    userInfo: userInfo._id, // Reference to the ChatUser document
    userDynamicFields: {
      badges: message.userInfo.badges,
      badgeInfo: message.userInfo.badgeInfo,
      isBroadcaster: message.userInfo.isBroadcaster ?? false,
      isSubscriber: message.userInfo.isSubscriber ?? false,
      isFounder: message.userInfo.isFounder ?? false,
      isMod: message.userInfo.isMod ?? false,
      isVip: message.userInfo.isVip ?? false,
      isArtist: message.userInfo.isArtist ?? false,
    },
  };
}

export default async function saveChatMessage(
  voddingChatMessage: VoddingChatMessage,
) {
  const chatMessageData =
    await createChatMessageModelFromMessage(voddingChatMessage);
  const chatMessage = new ChatMessageModel(chatMessageData);
  return await chatMessage.save();
}

export async function getChatMessagesByChannel(channelId: string) {
  return await ChatMessageModel.find({ channelId })
    .populate<{ userInfo: IChatUser }>("userInfo")

    .exec();
}

// Query chat messages for a specific user
export async function getChatMessagesByUser(userId: string) {
  return await ChatMessageModel.find({ userInfo: userId })
    .populate<{ userInfo: IChatUser }>("userInfo")

    .exec();
}

export async function getChatMessagesByChannelAndUser(
  channelId: string,
  userId: string,
) {
  return await ChatMessageModel.find({ channelId, userInfo: userId })
    .populate<{ userInfo: IChatUser }>("userInfo")

    .exec();
}

// Query chat messages by date range
export async function getChatMessagesByDateRange(
  startDate: Date,
  endDate: Date,
) {
  return await ChatMessageModel.find({
    date: { $gte: startDate, $lte: endDate },
  })
    .populate<{ userInfo: IChatUser }>("userInfo")

    .exec();
}

export async function getChatMessagesByUsernameInChannel(
  channelId: string,
  author: string,
  startDate: Date,
  endDate: Date,
) {
  const messagesByDateRange = await getChatMessagesByDateRange(
    startDate,
    endDate,
  );
  return messagesByDateRange.filter(
    (message) =>
      message.channelId === channelId && message.userInfo.userName === author,
  );
}

export async function getChatMessagesByFilter(filter: ChatMessageFilter) {
  return await ChatMessageModel.find(filter)
    .populate<{ userInfo: IChatUser }>("userInfo")

    .exec();
}
