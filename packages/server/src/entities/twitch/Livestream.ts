import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
  type Rel,
} from "@mikro-orm/postgresql";
import { ChatMessage } from "./ChatMessage";
import { TwitchChannel } from "./Channel";

@Entity()
export class Livestream {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  startedAt!: Date;

  @Property()
  endedAt?: Date;

  @Property()
  fileName?: string;

  @ManyToOne(() => TwitchChannel)
  channel!: Rel<TwitchChannel>;
}
