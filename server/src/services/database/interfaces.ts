import type {Types} from 'mongoose';

export type TwitchUserHistory = {
  date: Date;
  userName?: string;
  displayName?: string;
  profilePictureUrl?: string;
  color?: string;
  userType?: string;
};

export type TwitchUser = {
  badges: any;
  badgeInfo: any;
  isBroadcaster: boolean;
  isSubscriber: boolean;
  isFounder: boolean;
  isMod: boolean;
  isVip: boolean;
  isArtist: boolean;
  userName: string;
  displayName: string;
  profilePictureUrl: string;
  userId: string;
  color?: string;
  userType?: string;
  history: TwitchUserHistory[];
};

export type UserDynamicFields = {
  badges: Map<string, string>;
  badgeInfo: Map<string, string>;
  isBroadcaster: boolean;
  isSubscriber: boolean;
  isFounder: boolean;
  isMod: boolean;
  isVip: boolean;
  isArtist: boolean;
};

export type TwitchChatMessage = {
  id: string;
  date: Date;
  channelId: string | undefined;
  isCheer: boolean;
  isRedemption: boolean;
  rewardId: string | undefined;
  isFirst: boolean;
  isReturningChatter: boolean;
  isHighlight: boolean;
  isReply: boolean;
  parentMessageId: string | undefined;
  parentMessageText: string | undefined;
  parentMessageUserId: string | undefined;
  parentMessageUserName: string | undefined;
  parentMessageUserDisplayName: string | undefined;
  threadMessageId: string | undefined;
  threadMessageUserId: string | undefined;
  bits: number;
  emoteOffsets: Map<string, string[]>;
  isHypeChat: boolean;
  hypeChatAmount: number | undefined;
  hypeChatDecimalPlaces: number | undefined;
  hypeChatLocalizedAmount: number | undefined;
  hypeChatCurrency: string | undefined;
  hypeChatLevel: number | undefined;
  hypeChatIsSystemMessage: boolean | undefined;
  userInfo: Types.ObjectId; // ObjectId reference to TwitchUser
  userDynamicFields: UserDynamicFields;
};

export type TransmittedTwitchChatMessage = {
  channel: string;
  user: string;
  text: string;
  voddingMsg: Types.ObjectId; // ObjectId reference to TwitchChatMessage
};
