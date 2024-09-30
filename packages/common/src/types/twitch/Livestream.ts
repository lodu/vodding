import type { TwitchChannel } from "./Channel";

export interface Title {
  text: string;
  createdAt: Date;
}

export interface Livestream {
  id: number;
  titles: Title[];
  startedAt: Date;
  endedAt?: Date;
  videoUrl: string;
  channel: TwitchChannel;
}
