import type { ChatMessage } from "@twurple/chat"

export interface datastoreChatMesssage {
    channel: string
    user: string
    text: string
    msg: ChatMessage
}