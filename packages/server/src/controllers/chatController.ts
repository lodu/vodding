import type { EntityManager } from "@mikro-orm/postgresql";
import { TwitchChannel } from "../entities/twitch/Channel";
import { ChatMessage as ChatMessageEntity } from "../entities/twitch/ChatMessage";
import type { ChatMessage } from "@twurple/chat";
import logger from "../utils/logger";
import { getUserIdByUsername } from "../services/twitch/apiService";
import { ChannelName } from "../entities/twitch/ChannelName";

export class ChatController {
  private entityManager: EntityManager;
  private fork: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
    this.fork = entityManager.fork();
  }

  public async handleIncomingMessage(
    channel: string,
    user: string,
    text: string,
    msg: ChatMessage
  ): Promise<void> {
    const channelId: string | null = msg.channelId
      ? msg.channelId
      : await getUserIdByUsername(channel);
    if (!channelId) {
      logger.error(
        `Unable to find channelId for message ${msg.id} by ${user} in ${channel}, message: ${text}`
      );
      return;
    }
    let authorEntity = await this.fork.findOne(TwitchChannel, {
      userId: msg.userInfo.userId,
    });
    let channelEntity = await this.fork.findOne(TwitchChannel, {
      userId: channelId,
    });

    if (!authorEntity) {
      authorEntity = new TwitchChannel(
        msg.userInfo.userId,
        msg.userInfo.displayName
      );
      const username = new ChannelName(msg.userInfo.userName);
      authorEntity.channelNames.add(username);
      await this.fork.persistAndFlush([authorEntity, username]);
    } else if (
      authorEntity.currentChannelName().username &&
      authorEntity.currentChannelName().username !== msg.userInfo.userName
    ) {
      const newUsername = new ChannelName(msg.userInfo.userName);
      authorEntity.channelNames.add(newUsername);
      await this.fork.persistAndFlush([authorEntity, newUsername]);
    }
    console.error(channelEntity);
    console.error(authorEntity);
    if (channelEntity && authorEntity) {
      const chatMessage = new ChatMessageEntity(
        msg.id,
        authorEntity,
        text,
        channelEntity,
        msg.date
      );
      await this.fork.persistAndFlush(chatMessage);
    } else {
      logger.error(
        `Unable to log message. Reason: channel or entity cannot be found and/or created. Message:  ${msg.id} by ${user} in ${channel}, message: ${text}`
      );
    }
  }
}
