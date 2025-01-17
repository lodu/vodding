import type {
  VoddingTwitchChatMessage,
  VoddingTwitchChatUser,
  VoddingTwitchUser,
} from "@vodding/common/chatTypes";
import TwitchApiService from "../services/twitch/apiService";
import type { HelixUser } from "@twurple/api";
import TwitchChatUserService from "../services/database/TwitchChatUserService";

class UserController {
  static async getVoddingTwitchUser(
    username: string,
  ): Promise<VoddingTwitchUser> {
    let user = await TwitchChatUserService.getUserByUsername(username);
    if (!user) {
      const twitchUser: HelixUser =
        await TwitchApiService.getUserByUsername(username);
      user = await TwitchChatUserService.createTwitchUser({
        userId: twitchUser.id,
        userName: twitchUser.name,
        displayName: twitchUser.displayName,
        profilePictureUrl: twitchUser.profilePictureUrl,
        userType: twitchUser.type,
        history: [],
      });
    }
    const voddingUser = {
      userName: user.userName,
      displayName: user.displayName,
      userId: user.userId,
      userType: user.userType,
      profilePictureUrl: user.profilePictureUrl,
    } as VoddingTwitchUser;
    return voddingUser;
  }
}

export default UserController;
