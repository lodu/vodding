import * as path from 'path';
import config from '../../utils/config';
import type { ChatMessage } from '@twurple/chat';
import type { datastoreChatMesssage } from './interfaces';
import { JSONFilePreset } from 'lowdb/node';


type ChatMessageData = {
    messages: datastoreChatMesssage[]
}
const defaultData: ChatMessageData = { messages: [] }

const FileStoreService = {
    async writeChatMessage(channel: string, user: string, text: string, msg: ChatMessage): Promise<void> {

        const chatMessage: datastoreChatMesssage = {
            channel,
            user,
            text,
            msg
        }
        const filePath = path.join(config.datastore.folder, `${channel}.json`);

        await JSONFilePreset<ChatMessageData>(filePath, defaultData).then((db) => {
            db.data.messages.push(chatMessage);
        })
    }
}

export default FileStoreService;