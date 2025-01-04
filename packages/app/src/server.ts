import config from "./config";
import { createServer } from "http";
import app from "./app";
import logger from "./utils/logger";
import { setupTwitchListeners } from "./services/twitch/eventSubService";
import { initializeSocket } from "./websockets/socket";

import MongooseClient from "./services/database/clients/MongooseClient";
import MigrationClient from "./services/database/clients/MigrationClient";
import { setupFolders } from "./utils/config";

const PORT = config.serverPort;

setupFolders(config);

await MongooseClient.connect();
await MigrationClient.connect();

const server = createServer(app);
initializeSocket(server);

server.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);
  await setupTwitchListeners(false);
});
