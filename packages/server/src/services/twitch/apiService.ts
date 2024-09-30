import { twitchClient } from "../../utils/twitchClient";

const getUserIdByUsername = async (
  username: string
): Promise<string | null> => {
  try {
    const user = await twitchClient.users.getUserByName(username);
    return user ? user.id : null;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching user ID for ${username}: ${error.message}`);
    } else {
      console.error(`Unknown error fetching user ID for ${username}`);
    }
    return null;
  }
};

export { getUserIdByUsername };
