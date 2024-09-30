import type { ITwitchChannel } from "./Channel";
import type { ILivestream } from "./Livestream";

export interface ChatMessage {
  id: number;
  message: string;
  timestamp: Date;
  author: ITwitchChannel;
  livestream: ILivestream;
}
