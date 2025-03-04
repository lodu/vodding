import type {VoddingTwitchUser} from '@common/chatTypes.js';
import type {HelixUser} from '@twurple/api/lib/endpoints/user/HelixUser.js';
import twitchChatUserService from '@/services/database/twitch-chat-user-service.js';
import twitchApiService from '@/services/twitch/api-service.js';

const userController = {
  async getVoddingTwitchUser(username: string): Promise<VoddingTwitchUser> {
    let user = await twitchChatUserService.getUserByUsername(username);
    if (!user) {
      const twitchUser: HelixUser =
        await twitchApiService.getUserByUsername(username);
      user = await twitchChatUserService.createTwitchUser({
        userId: twitchUser.id,
        userName: twitchUser.name,
        displayName: twitchUser.displayName,
        profilePictureUrl: twitchUser.profilePictureUrl,
        userType: twitchUser.type,
        history: [],
        badges: undefined,
        badgeInfo: undefined,
        isBroadcaster: false,
        isSubscriber: false,
        isFounder: false,
        isMod: false,
        isVip: false,
        isArtist: false,
      });
    }

    const voddingUser: VoddingTwitchUser = {
      userName: user.userName,
      displayName: user.displayName,
      userId: user.userId,
      userType: user.userType,
      profilePictureUrl: user.profilePictureUrl,
    };
    return voddingUser;
  },
};

export default userController;
