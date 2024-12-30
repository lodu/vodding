import * as fs from 'fs';
import * as path from 'path';
import type { ChatMessage } from "@twurple/chat";
import FileStoreService from '../services/datastores/fileStoreService';
import { io } from '../websockets/socket';


class ChatController {
    async handleIncomingMessage(channel: string, user: string, text: string, msg: ChatMessage): Promise<void> {
        FileStoreService.writeChatMessage(channel, user, text, msg);

        io.to(channel).emit('chatMessage', { channel, user, text, msg });
    }

}

export const chatController = new ChatController();