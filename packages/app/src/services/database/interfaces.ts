import type { Types } from "mongoose";

export interface ITwitchUserHistory {
  date: Date;
  userName?: string;
  displayName?: string;
  profilePictureUrl?: string;
  color?: string;
  userType?: string;
}

export interface ITwitchUser {
  userName: string;
  displayName: string;
  profilePictureUrl: string;
  userId: string;
  color?: string;
  userType?: string;
  history: ITwitchUserHistory[];
}

export interface IUserDynamicFields {
  badges: Map<string, string>;
  badgeInfo: Map<string, string>;
  isBroadcaster: boolean;
  isSubscriber: boolean;
  isFounder: boolean;
  isMod: boolean;
  isVip: boolean;
  isArtist: boolean;
}

export interface ITwitchChatMessage {
  id: string;
  date: Date;
  channelId: string | null;
  isCheer: boolean;
  isRedemption: boolean;
  rewardId: string | null;
  isFirst: boolean;
  isReturningChatter: boolean;
  isHighlight: boolean;
  isReply: boolean;
  parentMessageId: string | null;
  parentMessageText: string | null;
  parentMessageUserId: string | null;
  parentMessageUserName: string | null;
  parentMessageUserDisplayName: string | null;
  threadMessageId: string | null;
  threadMessageUserId: string | null;
  bits: number;
  emoteOffsets: Map<string, string[]>;
  isHypeChat: boolean;
  hypeChatAmount: number | null;
  hypeChatDecimalPlaces: number | null;
  hypeChatLocalizedAmount: number | null;
  hypeChatCurrency: string | null;
  hypeChatLevel: number | null;
  hypeChatIsSystemMessage: boolean | null;
  userInfo: Types.ObjectId; // ObjectId reference to TwitchUser
  userDynamicFields: IUserDynamicFields;
}

export interface ITransmittedTwitchChatMessage {
  channel: string;
  user: string;
  text: string;
  voddingMsg: Types.ObjectId; // ObjectId reference to TwitchChatMessage
}
