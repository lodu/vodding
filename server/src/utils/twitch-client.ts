import {ApiClient} from '@twurple/api/lib/client/ApiClient.js';
import {AppTokenAuthProvider} from '@twurple/auth/lib/providers/AppTokenAuthProvider.js';
import {StaticAuthProvider} from '@twurple/auth/lib/providers/StaticAuthProvider.js';
import {ChatClient} from '@twurple/chat/lib/ChatClient.js';
import config from '@/config/index.js';

const authProvider = new StaticAuthProvider(
  config.twitch.clientId,
  config.twitch.accessToken,
);
const tokenAuthProvider = new AppTokenAuthProvider(
  config.twitch.clientId,
  config.twitch.clientSecret,
);

export const twitchClient = new ApiClient({authProvider});
export const chatClient = new ChatClient();
