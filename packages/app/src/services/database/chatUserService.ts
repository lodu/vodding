import type { IChatUserHistory } from "./interfaces";
import ChatUserModel from "./models/ChatUser";
import type { VoddingChatMessage } from "@vodding/common/chatTypes";

export interface ChatUserFilter {
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
export async function createChatUserModelFromMessage(
  message: VoddingChatMessage,
) {
  const chatUser = new ChatUserModel({
    userId: message.userInfo.userId,
    userName: message.userInfo.userName,
    displayName: message.userInfo.displayName,
    profilePictureUrl: message.userInfo.profilePictureUrl,
    color: message.userInfo.color,
    userType: message.userInfo.userType,
  });

  await chatUser.save();
  return chatUser;
}

export async function getOrCreateUser(message: VoddingChatMessage) {
  let user = await ChatUserModel.findOne({ userId: message.userInfo.userId })

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
      } as IChatUserHistory);
      user.userName = message.userInfo.userName;
      user.displayName = message.userInfo.displayName;
      user.profilePictureUrl = message.userInfo.profilePictureUrl;
      user.color = message.userInfo.color;
      user.userType = message.userInfo.userType;
      user.history = historyEntries;

      await user.save();
    }
  } else {
    user = await createChatUserModelFromMessage(message);
  }

  return user;
}
