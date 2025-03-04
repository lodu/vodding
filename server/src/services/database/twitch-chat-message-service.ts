import type {VoddingTwitchChatMessage} from '@common/chatTypes.js';
import type {TwitchChatMessage, TwitchUser} from './interfaces.js';
import TwitchChatMessageModel from './models/twitch-chat-message.js';
import twitchChatUserService from './twitch-chat-user-service.js';

export type TwitchChatMessageFilter = {
  id?: string;
  date?: {$gte?: Date; $lte?: Date};
  channelId?: string | undefined;
  isCheer?: boolean;
  isRedemption?: boolean;
  rewardId?: string | undefined;
  isFirst?: boolean;
  isReturningChatter?: boolean;
  isHighlight?: boolean;
  isReply?: boolean;
  parentMessageId?: string | undefined;
  parentMessageText?: string | undefined;
  parentMessageUserId?: string | undefined;
  parentMessageUserName?: string | undefined;
  threadMessageId?: string | undefined;
  threadMessageUserId?: string | undefined;
  bits?: {$gte?: number; $lte?: number};
  isHypeChat?: boolean;
  hypeChatAmount?: number | undefined;
  hypeChatDecimalPlaces?: number | undefined;
  hypeChatLocalizedAmount?: number | undefined;
  hypeChatCurrency?: string | undefined;
  hypeChatLevel?: number | undefined;
  hypeChatIsSystemMessage?: boolean | undefined;
  authorId: string;
};
async function createTwitchChatMessageModelFromMessage(
  message: VoddingTwitchChatMessage,
): Promise<TwitchChatMessage> {
  const userInfo = await twitchChatUserService.getOrCreateUser(message);

  return {
    id: message.id,
    date: message.date,
    channelId: message.channelId ?? undefined,
    isCheer: message.isCheer,
    isRedemption: message.isRedemption,
    rewardId: message.rewardId ?? undefined,
    isFirst: message.isFirst,
    isReturningChatter: message.isReturningChatter,
    isHighlight: message.isHighlight,
    isReply: message.isReply,
    ...getParentMessageFields(message),
    ...getThreadMessageFields(message),
    bits: message.bits,
    emoteOffsets: message.emoteOffsets,
    ...getHypeChatFields(message),
    userInfo: userInfo._id, // Reference to the TwitchUser document
    userDynamicFields: getUserDynamicFields(message),
  };
}

function getParentMessageFields(message: VoddingTwitchChatMessage) {
  return {
    parentMessageId: message.parentMessageId ?? undefined,
    parentMessageText: message.parentMessageText ?? undefined,
    parentMessageUserId: message.parentMessageUserId ?? undefined,
    parentMessageUserName: message.parentMessageUserName ?? undefined,
    parentMessageUserDisplayName:
      message.parentMessageUserDisplayName ?? undefined,
  };
}

function getThreadMessageFields(message: VoddingTwitchChatMessage) {
  return {
    threadMessageId: message.threadMessageId ?? undefined,
    threadMessageUserId: message.threadMessageUserId ?? undefined,
  };
}

function getHypeChatFields(message: VoddingTwitchChatMessage) {
  return {
    isHypeChat: message.isHypeChat ?? false,
    hypeChatAmount: message.hypeChatAmount ?? undefined,
    hypeChatDecimalPlaces: message.hypeChatDecimalPlaces ?? undefined,
    hypeChatLocalizedAmount: message.hypeChatLocalizedAmount ?? undefined,
    hypeChatCurrency: message.hypeChatCurrency ?? undefined,
    hypeChatLevel: message.hypeChatLevel ?? undefined,
    hypeChatIsSystemMessage: message.hypeChatIsSystemMessage ?? false,
  };
}

function getUserDynamicFields(message: VoddingTwitchChatMessage) {
  return {
    badges: message.userInfo.badges,
    badgeInfo: message.userInfo.badgeInfo,
    isBroadcaster: message.userInfo.isBroadcaster ?? false,
    isSubscriber: message.userInfo.isSubscriber ?? false,
    isFounder: message.userInfo.isFounder ?? false,
    isMod: message.userInfo.isMod ?? false,
    isVip: message.userInfo.isVip ?? false,
    isArtist: message.userInfo.isArtist ?? false,
  };
}

const twitchChatMessageService = {
  async saveTwitchChatMessage(
    voddingTwitchChatMessage: VoddingTwitchChatMessage,
  ) {
    const twitchChatMessageData = await createTwitchChatMessageModelFromMessage(
      voddingTwitchChatMessage,
    );
    const twitchChatMessage = new TwitchChatMessageModel(twitchChatMessageData);
    return twitchChatMessage.save();
  },

  async getTwitchChatMessagesByChannel(channelId: string) {
    return TwitchChatMessageModel.find({channelId})
      .populate<{userInfo: TwitchUser}>('userInfo')

      .exec();
  },

  // Query chat messages for a specific user
  async getTwitchChatMessagesByUser(userId: string) {
    return TwitchChatMessageModel.find({userInfo: userId})
      .populate<{userInfo: TwitchUser}>('userInfo')

      .exec();
  },

  async getTwitchChatMessagesByChannelAndUser(
    channelId: string,
    userId: string,
  ) {
    return TwitchChatMessageModel.find({channelId, userInfo: userId})
      .populate<{userInfo: TwitchUser}>('userInfo')

      .exec();
  },

  // Query chat messages by date range
  async getTwitchChatMessagesByDateRange(startDate: Date, endDate: Date) {
    return TwitchChatMessageModel.find({
      date: {$gte: startDate, $lte: endDate},
    })
      .populate<{userInfo: TwitchUser}>('userInfo')

      .exec();
  },

  async getTwitchChatMessagesByUsernameInChannel(
    channelId: string,
    author: string,
    startDate: Date,
    endDate: Date,
  ) {
    const messagesByDateRange =
      await twitchChatMessageService.getTwitchChatMessagesByDateRange(
        startDate,
        endDate,
      );
    return messagesByDateRange.filter(
      (message) =>
        message.channelId === channelId && message.userInfo.userName === author,
    );
  },

  async getTwitchChatMessagesByFilter(filter: TwitchChatMessageFilter) {
    return TwitchChatMessageModel.find((message: TwitchChatMessage) =>
      filterMessage(message, filter),
    )
      .populate<{userInfo: TwitchUser}>('userInfo')
      .exec();

    function filterMessage(
      message: TwitchChatMessage,
      filter: TwitchChatMessageFilter,
    ): boolean {
      for (const key in filter) {
        if (
          filter[key as keyof TwitchChatMessageFilter] !== undefined &&
          filter[key as keyof TwitchChatMessageFilter] !==
            (message as any)[key as keyof TwitchChatMessageFilter]
        ) {
          return false;
        }
      }

      return true;
    }
  },
};

export default twitchChatMessageService;
