import express from 'express';
import bodyParser from 'body-parser';
import {errorHandler} from './middlewares/error-handler.js';
import {requestLogger} from './middlewares/request-logger.js';
import channelRouter from './routes/channel/channel-routes.js';
import config from '@/config/index.js';

const app = express();

app.use(bodyParser.json());

const appRouter = express.Router(); // eslint-disable-line new-cap
appRouter.use('/channels', channelRouter);

app.use(config.vodding.basePath, appRouter);
app.use(requestLogger);
app.use(errorHandler);

export default app;
