// Import your models here

import logger from "../src/utils/logger";

export async function up(): Promise<void> {
  logger.info("Initial migration has no changes");
}

export async function down(): Promise<void> {
  logger.info("Initial migration has no changes");
}
