// Import your models here

import logger from '../src/utils/logger.js';

export async function up(): Promise<void> {
  logger.info('Initial migration has no changes');
}

export async function down(): Promise<void> {
  logger.info('Initial migration has no changes');
}
