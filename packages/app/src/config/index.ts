import fs from "fs";
import type { VoddingConfig } from "./vodding.config";
import voddingConfig from "./vodding.config";
import twitchConfig, { type TwitchConfig } from "./twitch.config";
import { getEnvVar } from "../utils/config";
import { env } from "bun";

export interface Config {
  environment: string;
  serverPort: number;
  twitch: TwitchConfig;
  vodding: VoddingConfig;
}

const config: Config = {
  environment: getEnvVar("NODE_ENV", "development"),
  serverPort: parseInt(getEnvVar("SERVER_PORT", "3000"), 10),
  twitch: twitchConfig,
  vodding: voddingConfig,
};

export default config;
