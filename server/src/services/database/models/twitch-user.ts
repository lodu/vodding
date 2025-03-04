import {Schema, model} from 'mongoose';
import type {TwitchUser} from '../interfaces.js';

const twitchUserSchema = new Schema<TwitchUser>({
  userName: {type: String, required: true},
  displayName: {type: String, required: true},
  profilePictureUrl: {type: String, required: true},
  userId: {type: String, required: true},
  color: {type: String, default: null},
  userType: {type: String, default: null},
  history: [
    {
      date: {type: Date, default: Date.now},
      userName: {type: String},
      displayName: {type: String},
      profilePictureUrl: {type: String},
      color: {type: String},
      userType: {type: String},
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const TwitchUserModel = model('TwitchUser', twitchUserSchema);

export default TwitchUserModel;
