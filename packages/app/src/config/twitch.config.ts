import { getEnvVar } from "../utils/config";

export interface TwitchConfig {
  oAuth: string;
  clientId: string;
  clientSecret: string;
  accessToken: string;
  // nick: string;
}

const twitchConfig: TwitchConfig = {
  oAuth: getEnvVar("TWITCH_OAUTH"),
  clientId: getEnvVar("TWITCH_CLIENT_ID"),
  clientSecret: getEnvVar("TWITCH_CLIENT_SECRET"),
  accessToken: getEnvVar("TWITCH_ACCESS_TOKEN"),
};

export default twitchConfig;
