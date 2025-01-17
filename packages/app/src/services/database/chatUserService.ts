import type { ITwitchUserHistory } from "./interfaces";
import TwitchUserModel from "./models/TwitchUser";
import type { VoddingTwitchChatMessage } from "@vodding/common/chatTypes";

export interface TwitchUserFilter {
  userId?: string;
  userName?: string;
  displayName?: string;
  profilePictureUrl?: string;
  color?: string;
  userType?: string;
  history?: {
    date?: { $gte?: Date; $lte?: Date };
    userName?: string;
    displayName?: string;
    profilePictureUrl?: string;
  };
}
export async function createTwitchUserModelFromMessage(
  message: VoddingTwitchChatMessage,
) {
  const TwitchUser = new TwitchUserModel({
    userId: message.userInfo.userId,
    userName: message.userInfo.userName,
    displayName: message.userInfo.displayName,
    profilePictureUrl: message.userInfo.profilePictureUrl,
    color: message.userInfo.color,
    userType: message.userInfo.userType,
  });

  await TwitchUser.save();
  return TwitchUser;
}

export async function getOrCreateUser(message: VoddingTwitchChatMessage) {
  let user = await TwitchUserModel.findOne({ userId: message.userInfo.userId })

    .exec();

  if (user) {
    const hasChanges =
      user.userName !== message.userInfo.userName ||
      user.displayName !== message.userInfo.displayName ||
      user.profilePictureUrl !== message.userInfo.profilePictureUrl ||
      user.color !== message.userInfo.color ||
      user.userType !== message.userInfo.userType;

    if (hasChanges) {
      const historyEntries = user.history;
      historyEntries.push({
        date: new Date(),
        userName: user.userName,
        displayName: user.displayName,
        profilePictureUrl: user.profilePictureUrl,
        color: user.color,
        userType: user.userType,
      } as ITwitchUserHistory);
      user.userName = message.userInfo.userName;
      user.displayName = message.userInfo.displayName;
      user.profilePictureUrl = message.userInfo.profilePictureUrl;
      user.color = message.userInfo.color;
      user.userType = message.userInfo.userType;
      user.history = historyEntries;

      await user.save();
    }
  } else {
    user = await createTwitchUserModelFromMessage(message);
  }

  return user;
}
