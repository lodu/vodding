import type { ChatMessage } from "./ChatMessage";
import type { Livestream } from "./Livestream";
export interface ChannelName {
  id: number;
  channelName: string;
  changedAt: Date;
  channel: TwitchChannel;
}
export interface TwitchChannel {
  id: number;
  currentChannelName: ChannelName;
  displayName: string;
  createdAt: Date;
  channelNames: ChannelName[];
  livestreams: Livestream[];
  chatMessages: ChatMessage[];
}
