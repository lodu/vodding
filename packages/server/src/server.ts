import { createServer } from "http";
import app from "./app";
import logger from "./utils/logger";
import config from "./utils/config";
import { setupTwitchListeners } from "./services/twitch/eventSubService";
import { initializeSocket } from "./websockets/socket";
const PORT = config.serverPort;



const server = createServer(app);
initializeSocket(server);

server.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);
  await setupTwitchListeners(false);
});
