import express, {type Request} from 'express';
import {StatusCodes} from 'http-status-codes';
import {getTwitchChatMessagesByFilter} from '@/services/database/chat-message-service.js';
import twitchApiService from '@/services/twitch/api-service.js';

const chatRouter = express.Router({mergeParams: true}); // eslint-disable-line new-cap
type ChatRequest = {
  params: {
    channelName: string;
  };
} & Request;

chatRouter.get('/', async (request: ChatRequest, response) => {
  const channelName = request.params.channelName;
  const channel = await twitchApiService.getUserByUsername(channelName);
  const startDate = request.query.startDate
    ? new Date(request.query.startDate as string)
    : undefined;
  const endDate = request.query.endDate
    ? new Date(request.query.endDate as string)
    : undefined;
  const author = (request.query.author as string) || '';

  const filter = {
    channelId: channel.id,
    authorId: author,
    date: startDate && endDate ? {$gte: startDate, $lte: endDate} : undefined,
  };

  await getTwitchChatMessagesByFilter(filter)
    .then((messages) => {
      response.status(StatusCodes.OK).json(messages);
    })
    .catch((error_: unknown) => {
      const errorMessage =
        error_ instanceof Error ? error_.message : 'Unknown error';
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
    });
});

export default chatRouter;
