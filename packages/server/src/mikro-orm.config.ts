import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { ChatMessage } from "@twurple/chat";
import { TwitchChannel } from "./entities/twitch/Channel";
import { ChannelName } from "./entities/twitch/ChannelName";
import { Livestream } from "./entities/twitch/Livestream";
import config from "./utils/config";
import { Migrator } from "@mikro-orm/migrations";

export default defineConfig({
  entities: [ChannelName, TwitchChannel, ChatMessage, Livestream],
  driver: PostgreSqlDriver,
  dbName: config.database.name,
  host: config.database.host,
  password: config.database.password,
  port: config.database.port,
  user: config.database.user,
  highlighter: new SqlHighlighter(),
  extensions: [Migrator],
});
