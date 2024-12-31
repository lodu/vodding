import express, { type Request } from "express";
import { StatusCodes } from "http-status-codes";
import { error } from "winston";
import FileStoreService from "../../services/datastores/fileStoreService";
import logger from "../../utils/logger";

const chatRouter = express.Router({ mergeParams: true });
interface ChatRequest extends Request {
    params: {
        channelName: string;
    };
}

chatRouter.get("/", async (req: ChatRequest, res) => {
    const channelName = req.params.channelName as string;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    const author = req.query.author as string | undefined;


    if (startDate && endDate) {
        await FileStoreService.getChatMessagesBetweenDates(channelName, startDate, endDate, author).then((messages) => { res.status(StatusCodes.OK).json(messages) }).catch((err) => { res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message) });

    } else {
        await FileStoreService.getChatMessages(channelName, author).then((messages) => { res.status(StatusCodes.OK).json(messages) }).catch((err) => { res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message) });
    }
})

export default chatRouter;
