import { Schema, model } from "mongoose";
import type { ITwitchUser } from "../interfaces";

const TwitchUserSchema = new Schema<ITwitchUser>({
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
      userType: { type: String },
    },
  ],
});

const TwitchUserModel = model("TwitchUser", TwitchUserSchema);

export default TwitchUserModel;
