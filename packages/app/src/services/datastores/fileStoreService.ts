import * as path from "path";
import config from "../../utils/config";
import type { datastoreChatMesssage } from "./interfaces";
import { JSONFilePreset } from "lowdb/node";
import type { VoddingChatMessage } from "@vodding/common/chatTypes";

type ChatMessageData = {
  messages: datastoreChatMesssage[];
};
const defaultData: ChatMessageData = { messages: [] };

const filePath = (channel: string): string => {
  return path.join(config.datastore.folder, 'chat', `${channel}.json`);
};

const FileStoreService = {
  async writeChatMessage(
    channel: string,
    user: string,
    text: string,
    msg: VoddingChatMessage,
  ): Promise<void> {
    const db = await JSONFilePreset<ChatMessageData>(
      filePath(channel),
      defaultData,
    );

    const chatMessage: datastoreChatMesssage = {
      channel,
      user,
      text,
      msg,
    };

    await db.update(({ messages }) => messages.push(chatMessage));
  },
  async getChatMessages(
    channel: string,
    author?: string,
  ): Promise<datastoreChatMesssage[]> {
    const db = await JSONFilePreset<ChatMessageData>(
      filePath(channel),
      defaultData,
    );
    let messages = db.data.messages;
    messages = messages.map((message) => ({
      ...message,
      msg: {
        ...message.msg,
        date: new Date(message.msg.date),
      },
    }));
    if (author) {
      messages = messages.filter(
        (message) => message.user === author.toLowerCase(),
      );
    }
    return messages;
  },

  async getChatMessagesBetweenDates(
    channel: string,
    startDate: Date,
    endDate: Date,
    author?: string,
  ): Promise<datastoreChatMesssage[]> {
    return await FileStoreService.getChatMessages(channel, author).then(
      (messages) => {
        messages.filter((message) => {
          const messageDate = new Date(message.msg.date);
          return messageDate >= startDate && messageDate <= endDate;
        });
        if (author) {
          messages = messages.filter(
            (message) => message.user === author.toLowerCase(),
          );
        }
        return messages;
      },
    );
  },
};

export default FileStoreService;
