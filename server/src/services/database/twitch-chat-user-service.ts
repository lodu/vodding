import type {VoddingTwitchChatMessage} from '@common/chatTypes.js';
import type {TwitchUser, TwitchUserHistory} from './interfaces.js';
import TwitchUserModel from './models/twitch-user.js';

export type TwitchUserFilter = {
  userId?: string;
  userName?: string;
  displayName?: string;
  profilePictureUrl?: string;
  color?: string;
  userType?: string;
  history?: {
    date?: {$gte?: Date; $lte?: Date};
    userName?: string;
    displayName?: string;
    profilePictureUrl?: string;
  };
};
const twitchChatUserService = {
  async createTwitchUserModelFromMessage(message: VoddingTwitchChatMessage) {
    const userInfo: TwitchUser = {
      userId: message.userInfo.userId,
      userName: message.userInfo.userName,
      displayName: message.userInfo.displayName,
      profilePictureUrl: message.userInfo.profilePictureUrl,
      color: message.userInfo.color,
      userType: message.userInfo.userType,
      badges: message.userInfo.badges,
      badgeInfo: message.userInfo.badgeInfo,
      isBroadcaster: message.userInfo.isBroadcaster,
      isSubscriber: message.userInfo.isSubscriber,
      isFounder: message.userInfo.isFounder,
      isMod: message.userInfo.isMod,
      isVip: message.userInfo.isVip,
      isArtist: message.userInfo.isArtist,
      history: [],
    };
    const twitchUser = await twitchChatUserService.createTwitchUser(userInfo);
    return twitchUser;
  },
  async createTwitchUser(userInfo: TwitchUser) {
    const twitchUser = new TwitchUserModel(userInfo);

    await twitchUser.save();
    return twitchUser;
  },

  async getOrCreateUser(message: VoddingTwitchChatMessage) {
    let user = await TwitchUserModel.findOne({
      userId: message.userInfo.userId,
    }).exec();

    if (user) {
      const hasChanges =
        user.userName !== message.userInfo.userName ||
        user.displayName !== message.userInfo.displayName ||
        user.profilePictureUrl !== message.userInfo.profilePictureUrl ||
        user.color !== message.userInfo.color ||
        user.userType !== message.userInfo.userType;

      if (hasChanges) {
        const historyEntries = user.history;
        historyEntries.push({
          date: new Date(),
          userName: user.userName,
          displayName: user.displayName,
          profilePictureUrl: user.profilePictureUrl,
          color: user.color,
          userType: user.userType,
        } as TwitchUserHistory);
        user.userName = message.userInfo.userName;
        user.displayName = message.userInfo.displayName;
        user.profilePictureUrl = message.userInfo.profilePictureUrl;
        user.color = message.userInfo.color;
        user.userType = message.userInfo.userType;
        user.history = historyEntries;

        await user.save();
      }
    } else {
      user = await this.createTwitchUserModelFromMessage(message);
    }

    return user;
  },

  async getUserByUsername(username: string) {
    const user = await TwitchUserModel.findOne({userName: username}).exec();
    return user;
  },
};

export default twitchChatUserService;
