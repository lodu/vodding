import express from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import channelRouter from "./routes/channel/channelRoutes";
import config from "./config";
const app = express();

app.use(bodyParser.json());

const appRouter = express.Router();
appRouter.use("/channels", channelRouter);

app.use(config.vodding.basePath, appRouter);
app.use(requestLogger);
app.use(errorHandler);

export default app;
