import type {HelixUser} from '@twurple/api/lib/endpoints/user/HelixUser.js';
import {twitchClient} from '@/utils/twitch-client.js';
import logger from '@/utils/logger.js';

const twitchApiService = {
  async getUserByUsername(username: string): Promise<HelixUser> {
    return twitchClient.users.getUserByName(username).then((user) => {
      if (!user) {
        logger.error(`User ${username} not found`);
        throw new Error(`User ${username} not found`);
      }

      return user;
    });
  },
};

export default twitchApiService;
