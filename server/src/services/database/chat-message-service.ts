import type {
  VoddingTwitchChatMessage,
  VoddingTwitchChatUser,
} from '@common/chatTypes.js';
import {getOrCreateUser} from './chat-user-service.js';
import type {TwitchChatMessage, TwitchUser} from './interfaces.js';
import TwitchChatMessageModel from './models/twitch-chat-message.js';

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
  const userInfo = await getOrCreateUser(message);

  return {
    ...mapMessageToChatMessage(message),
    userInfo: userInfo._id, // Reference to the TwitchUser document
    userDynamicFields: mapUserDynamicFields(message.userInfo),
  };
}

function mapMessageToChatMessage(
  message: VoddingTwitchChatMessage,
): Omit<TwitchChatMessage, 'userInfo' | 'userDynamicFields'> {
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
    parentMessageId: message.parentMessageId ?? undefined,
    parentMessageText: message.parentMessageText ?? undefined,
    parentMessageUserId: message.parentMessageUserId ?? undefined,
    parentMessageUserName: message.parentMessageUserName ?? undefined,
    parentMessageUserDisplayName:
      message.parentMessageUserDisplayName ?? undefined,
    threadMessageId: message.threadMessageId ?? undefined,
    threadMessageUserId: message.threadMessageUserId ?? undefined,
    bits: message.bits,
    emoteOffsets: message.emoteOffsets,
    isHypeChat: message.isHypeChat ?? false,
    hypeChatAmount: message.hypeChatAmount ?? undefined,
    hypeChatDecimalPlaces: message.hypeChatDecimalPlaces ?? undefined,
    hypeChatLocalizedAmount: message.hypeChatLocalizedAmount ?? undefined,
    hypeChatCurrency: message.hypeChatCurrency ?? undefined,
    hypeChatLevel: message.hypeChatLevel ?? undefined,
    hypeChatIsSystemMessage: message.hypeChatIsSystemMessage ?? false,
  };
}

function mapUserDynamicFields(userInfo: VoddingTwitchChatUser) {
  return {
    badges: new Map(
      (userInfo.badges as unknown as string[]).map((badge) => [badge, badge]),
    ),
    badgeInfo: new Map(
      Object.entries(userInfo.badgeInfo as unknown as Record<string, string>),
    ),
    isBroadcaster: userInfo.isBroadcaster,
    isSubscriber: userInfo.isSubscriber ?? false,
    isFounder: userInfo.isFounder ?? false,
    isMod: userInfo.isMod ?? false,
    isVip: userInfo.isVip ?? false,
    isArtist: userInfo.isArtist ?? false,
  };
}

export default async function saveTwitchChatMessage(
  voddingTwitchChatMessage: VoddingTwitchChatMessage,
) {
  const twitchChatMessageData = await createTwitchChatMessageModelFromMessage(
    voddingTwitchChatMessage,
  );
  const twitchChatMessage = new TwitchChatMessageModel(twitchChatMessageData);
  return twitchChatMessage.save();
}

export async function getTwitchChatMessagesByChannel(channelId: string) {
  return TwitchChatMessageModel.find({channelId})
    .populate<{userInfo: TwitchUser}>('userInfo')

    .exec();
}

// Query chat messages for a specific user
export async function getTwitchChatMessagesByUser(userId: string) {
  return TwitchChatMessageModel.find({userInfo: userId})
    .populate<{userInfo: TwitchUser}>('userInfo')

    .exec();
}

export async function getTwitchChatMessagesByChannelAndUser(
  channelId: string,
  userId: string,
) {
  return TwitchChatMessageModel.find({channelId, userInfo: userId})
    .populate<{userInfo: TwitchUser}>('userInfo')

    .exec();
}

// Query chat messages by date range
export async function getTwitchChatMessagesByDateRange(
  startDate: Date,
  endDate: Date,
) {
  return TwitchChatMessageModel.find({
    date: {$gte: startDate, $lte: endDate},
  })
    .populate<{userInfo: TwitchUser}>('userInfo')

    .exec();
}

export async function getTwitchChatMessagesByUsernameInChannel(
  channelId: string,
  author: string,
  startDate: Date,
  endDate: Date,
) {
  const messagesByDateRange = await getTwitchChatMessagesByDateRange(
    startDate,
    endDate,
  );
  return messagesByDateRange.filter(
    (message) =>
      message.channelId === channelId && message.userInfo.userName === author,
  );
}

export async function getTwitchChatMessagesByFilter(
  filter: TwitchChatMessageFilter,
) {
  const messages = await TwitchChatMessageModel.find()
    .populate<{userInfo: TwitchUser}>('userInfo')
    .exec();

  return messages.filter((message) =>
    filterMessage(message as unknown as TwitchChatMessage, filter),
  );

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
}
