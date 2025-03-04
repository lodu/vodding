import fs from 'node:fs';
import {env} from 'bun';
import type {Config} from '@/config/index.js';

export const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = env[key];
  if (value === undefined || value === '') {
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

  for (const path of datastorePaths) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {recursive: true});
    }
  }
};
