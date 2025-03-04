import {createServer, type Server} from 'node:http';
import app from './app.js';
import config from './config/index.js';
import {setupTwitchListeners} from './services/twitch/event-sub-service.js';
import {setupFolders} from './utils/config.js';
import logger from './utils/logger.js';
import {initializeSocket} from './websockets/socket.js';
import mongooseClient from './services/database/clients/mongoose-client.js';
import migrationClient from './services/database/clients/migration-client.js';

const port = config.serverPort;
setupFolders(config);

await mongooseClient.connect();
await migrationClient.connect();

const server: Server = createServer(app);
initializeSocket(server);

server.listen(port, async () => {
  logger.info(`Server is running on port ${port}`);
  await setupTwitchListeners(true);
});
