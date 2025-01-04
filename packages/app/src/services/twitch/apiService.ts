import type { HelixUser } from "@twurple/api";
import { twitchClient } from "../../utils/twitchClient";

export const getUserByUsername = async (
  username: string,
): Promise<HelixUser> => {
  return await twitchClient.users.getUserByName(username).then((user) => {
    if (!user) {
      logger.error(`User ${username} not found`);
      throw new Error(`User ${username} not found`);
    }
    return user;
  });
};
