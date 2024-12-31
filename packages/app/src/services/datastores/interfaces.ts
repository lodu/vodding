import type { VoddingChatMessage } from "@vodding/common/chatTypes";

export interface datastoreChatMesssage {
  channel: string;
  user: string;
  text: string;
  msg: VoddingChatMessage;
}
