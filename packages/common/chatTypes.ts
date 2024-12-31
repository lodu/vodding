export interface VoddingChatUser {
  readonly userName: string;
  displayName: string;
  color?: string;
  badges: Map<string, string>;
  badgeInfo: Map<string, string>;
  userId: string;
  userType?: string;
  isBroadcaster: boolean;
  isSubscriber: boolean;
  isFounder: boolean;
  isMod: boolean;
  isVip: boolean;
  isArtist: boolean;
  profilePictureUrl: string;
}
export interface VoddingChatMessage {
  id: string;
  date: Date;
  userInfo: VoddingChatUser;
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
}

export interface TransmittedChatMessage {
  channel: string;
  user: string;
  text: string;
  voddingMsg: VoddingChatMessage;
}
