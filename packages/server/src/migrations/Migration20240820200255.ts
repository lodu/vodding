import { Migration } from '@mikro-orm/migrations';

export class Migration20240820200255 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "twitch_channel" ("id" serial primary key, "user_id" varchar(255) not null, "display_name" varchar(255) not null, "created_at" timestamptz not null);');

    this.addSql('create table "livestream" ("id" serial primary key, "title" varchar(255) not null, "started_at" timestamptz not null, "ended_at" timestamptz not null, "file_name" varchar(255) not null, "channel_id" int not null);');

    this.addSql('create table "channel_name" ("id" serial primary key, "username" varchar(255) not null, "changed_at" timestamptz not null, "channel_id" int not null);');

    this.addSql('alter table "livestream" add constraint "livestream_channel_id_foreign" foreign key ("channel_id") references "twitch_channel" ("id") on update cascade;');

    this.addSql('alter table "channel_name" add constraint "channel_name_channel_id_foreign" foreign key ("channel_id") references "twitch_channel" ("id") on update cascade;');
  }

}
