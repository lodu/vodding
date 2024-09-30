import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  type Rel,
} from "@mikro-orm/postgresql";
import { TwitchChannel } from "./Channel";

@Entity()
export class ChannelName {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  changedAt: Date = new Date();

  @ManyToOne(() => TwitchChannel)
  channel: Rel<TwitchChannel>;

  constructor(username: string) {
    this.username = username;
  }
}
