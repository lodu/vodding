import fs from 'node:fs';
import {env} from 'bun';
import voddingConfig, {type VoddingConfig} from './vodding-config.js';
import twitchConfig, {type TwitchConfig} from '@/config/twitch-config.js';
import {getEnvVariable} from '@/utils/config.js';

export type Config = {
  environment: string;
  serverPort: number;
  twitch: TwitchConfig;
  vodding: VoddingConfig;
};

const config: Config = {
  environment: getEnvVariable('NODE_ENV', 'development'),
  serverPort: Number.parseInt(getEnvVariable('SERVER_PORT', '3000'), 10),
  twitch: twitchConfig,
  vodding: voddingConfig,
};

export default config;
