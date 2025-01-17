import type { VoddingTwitchChatMessage } from "@vodding/common/chatTypes";
import type { ITwitchChatMessage, ITwitchUser } from "./interfaces";
import TwitchChatMessageModel from "./models/TwitchChatMessage";
import TwitchChatUserService from "./TwitchChatUserService";

export interface TwitchChatMessageFilter {
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
async function createTwitchChatMessageModelFromMessage(
  message: VoddingTwitchChatMessage,
): Promise<ITwitchChatMessage> {
  const userInfo = await TwitchChatUserService.getOrCreateUser(message);

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
    userInfo: userInfo._id, // Reference to the TwitchUser document
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

class TwitchChatMessageService {
  static async saveTwitchChatMessage(
    voddingTwitchChatMessage: VoddingTwitchChatMessage,
  ) {
    const TwitchChatMessageData = await createTwitchChatMessageModelFromMessage(
      voddingTwitchChatMessage,
    );
    const TwitchChatMessage = new TwitchChatMessageModel(TwitchChatMessageData);
    return await TwitchChatMessage.save();
  }

  static async getTwitchChatMessagesByChannel(channelId: string) {
    return await TwitchChatMessageModel.find({ channelId })
      .populate<{ userInfo: ITwitchUser }>("userInfo")

      .exec();
  }

  // Query chat messages for a specific user
  static async getTwitchChatMessagesByUser(userId: string) {
    return await TwitchChatMessageModel.find({ userInfo: userId })
      .populate<{ userInfo: ITwitchUser }>("userInfo")

      .exec();
  }

  static async getTwitchChatMessagesByChannelAndUser(
    channelId: string,
    userId: string,
  ) {
    return await TwitchChatMessageModel.find({ channelId, userInfo: userId })
      .populate<{ userInfo: ITwitchUser }>("userInfo")

      .exec();
  }

  // Query chat messages by date range
  static async getTwitchChatMessagesByDateRange(
    startDate: Date,
    endDate: Date,
  ) {
    return await TwitchChatMessageModel.find({
      date: { $gte: startDate, $lte: endDate },
    })
      .populate<{ userInfo: ITwitchUser }>("userInfo")

      .exec();
  }

  static async getTwitchChatMessagesByUsernameInChannel(
    channelId: string,
    author: string,
    startDate: Date,
    endDate: Date,
  ) {
    const messagesByDateRange =
      await TwitchChatMessageService.getTwitchChatMessagesByDateRange(
        startDate,
        endDate,
      );
    return messagesByDateRange.filter(
      (message) =>
        message.channelId === channelId && message.userInfo.userName === author,
    );
  }

  static async getTwitchChatMessagesByFilter(filter: TwitchChatMessageFilter) {
    return await TwitchChatMessageModel.find(filter)
      .populate<{ userInfo: ITwitchUser }>("userInfo")

      .exec();
  }
}

export default TwitchChatMessageService;
