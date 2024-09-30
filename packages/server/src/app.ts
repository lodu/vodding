import express from "express";
import bodyParser from "body-parser";
import logger from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import indexRouter from "./routes/index";
const app = express();

app.use(bodyParser.json());
app.use(requestLogger);
app.use("/", indexRouter);
app.use(errorHandler);

export default app;
