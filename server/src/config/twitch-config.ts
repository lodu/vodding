import {getEnvVariable} from '@/utils/config.js';

export type TwitchConfig = {
  oAuth: string;
  clientId: string;
  clientSecret: string;
  accessToken: string;
  // Nick: string;
};

const twitchConfig: TwitchConfig = {
  oAuth: getEnvVariable('TWITCH_OAUTH'),
  clientId: getEnvVariable('TWITCH_CLIENT_ID'),
  clientSecret: getEnvVariable('TWITCH_CLIENT_SECRET'),
  accessToken: getEnvVariable('TWITCH_ACCESS_TOKEN'),
};

export default twitchConfig;
