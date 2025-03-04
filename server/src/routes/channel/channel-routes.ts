import express, {Router as router} from 'express';
import videoRouter from './video-routes.js';
import chatRouter from './chat-routes.js';
import userController from '@/controllers/user-controller.js';

const channelRouter = router();

channelRouter.get('/', async (request, response) => {
  response.send('Channel routes route');
});
channelRouter.get('/:channelName', async (request, response) => {
  const channelName = request.params.channelName;
  const user = await userController.getVoddingTwitchUser(channelName);
  if (!user) {
    response.status(404).json({error: 'Channel not found'});
  }

  response.send(user);
});

channelRouter.use('/:channelName/video', videoRouter);
channelRouter.use('/:channelName/chat', chatRouter);

export default channelRouter;
