import express from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import channelRouter from "./routes/channel/channelRoutes";
const app = express();

app.use(bodyParser.json());
app.use("/channels", channelRouter);
app.use(requestLogger);
app.use(errorHandler);

export default app;
