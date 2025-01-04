import { Schema, model } from "mongoose";
import type { IChatUser } from "../interfaces";

const ChatUserSchema = new Schema<IChatUser>({
  userName: { type: String, required: true },
  displayName: { type: String, required: true },
  profilePictureUrl: { type: String, required: true },
  userId: { type: String, required: true },
  color: { type: String, default: null },
  userType: { type: String, default: null },
  history: [
    {
      date: { type: Date, default: Date.now },
      userName: { type: String },
      displayName: { type: String },
      profilePictureUrl: { type: String },
      color: { type: String },
    },
  ],
});

const ChatUserModel = model("ChatUser", ChatUserSchema);

export default ChatUserModel;
