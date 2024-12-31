import { AppTokenAuthProvider, StaticAuthProvider } from "@twurple/auth";

import { ApiClient } from "@twurple/api";
import { ChatClient } from "@twurple/chat";
import config from "./config";
import logger from "./logger";

const authProvider = new StaticAuthProvider(
  config.twitch.clientId,
  config.twitch.accessToken,
);
const tokenAuthProvider = new AppTokenAuthProvider(
  config.twitch.clientId,
  config.twitch.clientSecret,
);

export const twitchClient = new ApiClient({ authProvider });
export const chatClient = new ChatClient();
