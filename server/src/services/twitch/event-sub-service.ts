import {EventSubWsListener} from '@twurple/eventsub-ws/lib/EventSubWsListener.js';
import {startStreamRecording} from '../stream-service.js';
import {startLogChat} from './chat-service.js';
import TwitchApiService from './api-service.js';
import logger from '@/utils/logger.js';
import {twitchClient} from '@/utils/twitch-client.js';

const listener = new EventSubWsListener({
  apiClient: twitchClient,
});

const createListener = async (userName: string, record: boolean) => {
  const user = await TwitchApiService.getUserByUsername(userName);

  startLogChat(user);
  if (!record) return;
  listener.onStreamOnline(user, (event) => {
    const streamerName = event.broadcasterDisplayName;
    logger.debug(`${streamerName} just went live! Starting recording...`);
    void startStreamRecording(streamerName);
  });
  logger.info(`Listener created for ${userName}`);

  const stream = await twitchClient.streams.getStreamByUserId(user.id);
  if (stream) {
    logger.info(`Listener created for ${stream.title}`);
    logger.debug(`${user.displayName} is already live! Starting recording...`);
    void startStreamRecording(user.displayName);
  }
};

export const setupTwitchListeners = async (record = true) => {
  try {
    const recordingNames = ['noanoella'];

    await Promise.all(
      recordingNames.map(async (name) => {
        try {
          await createListener(name, record);
          logger.info(`Twitch EventSub WebSocket listener set up for ${name}`);
        } catch (error: unknown) {
          if (error instanceof Error) {
            logger.error(
              `Error setting up Twitch EventSub WebSocket listener for ${name}: ${error.message}`,
            );
          } else {
            logger.error(
              `Error setting up Twitch EventSub WebSocket listener for ${name}: ${String(error)}`,
            );
          }
        }
      }),
    );

    listener.start();
    logger.info('Twitch EventSub WebSocket listener set up and listening');
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `Error setting up Twitch EventSub WebSocket listener: ${error.message}`,
      );
    } else {
      logger.error(
        'Unexpected error setting up Twitch EventSub WebSocket listener',
      );
    }
  }
};
