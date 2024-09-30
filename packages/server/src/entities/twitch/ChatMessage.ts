import { Entity, PrimaryKey, Property, ManyToOne, type Rel } from "@mikro-orm/postgresql";
import { TwitchChannel } from "./Channel";
import { Livestream } from "./Livestream";

@Entity()
export class ChatMessage {
  @PrimaryKey()
  id!: number;

  @Property()
  messageId!: string;

  @Property()
  message!: string;

  @Property()
  timestamp!: Date;

  @ManyToOne(() => TwitchChannel)
  author!: Rel<TwitchChannel>;

  @ManyToOne(() => TwitchChannel)
  channel!: Rel<TwitchChannel>;

  constructor(
    messageId: string,
    author: TwitchChannel,
    message: string,
    channel: TwitchChannel,
    timestamp: Date
  ) {
    this.messageId = messageId;
    this.author = author;
    this.message = message;
    this.channel = channel;
    this.timestamp = timestamp;
  }
}
