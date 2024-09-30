import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  OneToOne,
} from "@mikro-orm/postgresql";
import { ChannelName } from "./ChannelName";
import { ChatMessage } from "./ChatMessage";
import { Livestream } from "./Livestream";

@Entity()
export class TwitchChannel {
  @PrimaryKey()
  id!: number;

  @Property()
  userId!: string;

  @Property()
  displayName!: string;

  @Property()
  createdAt: Date = new Date();

  @OneToMany(
    () => ChannelName,
    (channelName: ChannelName) => channelName.channel
  )
  channelNames = new Collection<ChannelName>(this);

  @OneToMany(() => Livestream, (livestream: Livestream) => livestream.channel)
  livestreams = new Collection<Livestream>(this);

  // currentChannelName() {
  //   return this.channelNames.reduce(
  //     (latest: ChannelName, current: ChannelName) => {
  //       return current.changedAt > latest.changedAt ? current : latest;
  //     }
  //   );
  // }

  constructor(userId: string, displayName: string) {
    this.userId = userId;
    this.displayName = displayName;
  }
}
