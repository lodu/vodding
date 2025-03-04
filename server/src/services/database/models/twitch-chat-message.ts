import {Schema, model} from 'mongoose';
import type {UserDynamicFields, TwitchChatMessage} from '../interfaces.js';

const userDynamicFieldsSchema = new Schema<UserDynamicFields>({
  badges: {type: Map, of: String, required: true},
  badgeInfo: {type: Map, of: String, required: true},
  isBroadcaster: {type: Boolean, required: true},
  isSubscriber: {type: Boolean, required: true},
  isFounder: {type: Boolean, required: true},
  isMod: {type: Boolean, required: true},
  isVip: {type: Boolean, required: true},
  isArtist: {type: Boolean, required: true},
});

const twitchChatMessageSchema = new Schema<TwitchChatMessage>({
  id: {type: String, required: true},
  date: {type: Date, required: true},
  channelId: {type: String, default: null},
  isCheer: {type: Boolean, required: true},
  isRedemption: {type: Boolean, required: true},
  rewardId: {type: String, default: null},
  isFirst: {type: Boolean, required: true},
  isReturningChatter: {type: Boolean, required: true},
  isHighlight: {type: Boolean, required: true},
  isReply: {type: Boolean, required: true},
  parentMessageId: {type: String, default: null},
  parentMessageText: {type: String, default: null},
  parentMessageUserId: {type: String, default: null},
  parentMessageUserName: {type: String, default: null},
  parentMessageUserDisplayName: {type: String, default: null},
  threadMessageId: {type: String, default: null},
  threadMessageUserId: {type: String, default: null},
  bits: {type: Number, required: true},
  emoteOffsets: {type: Map, of: [String], required: true},
  isHypeChat: {type: Boolean, required: true},
  hypeChatAmount: {type: Number, default: null},
  hypeChatDecimalPlaces: {type: Number, default: null},
  hypeChatLocalizedAmount: {type: Number, default: null},
  hypeChatCurrency: {type: String, default: null},
  hypeChatLevel: {type: Number, default: null},
  hypeChatIsSystemMessage: {type: Boolean, default: null},
  userInfo: {type: Schema.Types.ObjectId, ref: 'TwitchUser', required: true},
  userDynamicFields: {type: userDynamicFieldsSchema, required: true},
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const TwitchChatMessageModel = model(
  'TwitchChatMessage',
  twitchChatMessageSchema,
);

export default TwitchChatMessageModel;
