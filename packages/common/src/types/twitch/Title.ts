import type { ITwitchChannel } from "./Channel";
import type { ILivestream } from "./Livestream";

export interface Title {
  stream: ILivestream;
  createdAt: Date;
}
