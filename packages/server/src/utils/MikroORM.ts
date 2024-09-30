import { MikroORM, PostgreSqlDriver, defineConfig  } from "@mikro-orm/postgresql";
import { ChatMessage } from "../entities/twitch/ChatMessage";
import config from "./config";
import { TwitchChannel } from "../entities/twitch/Channel";
import { Livestream } from "../entities/twitch/Livestream";
import { ChannelName } from "../entities/twitch/ChannelName";
import mikroOrmConfig from "../mikro-orm.config";

export const orm = MikroORM.init({
 ...mikroOrmConfig
});
