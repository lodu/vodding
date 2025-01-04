import type { Config } from "../config";
import fs from "fs";
import { env } from "bun";

export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = env[key];
  if (value === undefined || value === "") {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

export const setupFolders = (config: Config) => {
  const datastorePaths = [
    config.vodding.storageFolder.chat,
    config.vodding.storageFolder.videos,
  ];

  datastorePaths.forEach((path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  });
};
