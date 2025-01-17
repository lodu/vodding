import { VoddingTwitchUser } from "@vodding/common/chatTypes";
import fetchInstance from "../fetchInstance";

class TwitchUserService {
  static async getUserByName(channelName: string): Promise<VoddingTwitchUser> {
    return await fetchInstance<VoddingTwitchUser>({ url: `/channels/${channelName}` })
      .then((user: VoddingTwitchUser) => user)
  }
}

export default TwitchUserService;
