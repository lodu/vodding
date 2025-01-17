## MongoDB Data Storage for Chat Messages and Users

In our application, individual chat messages and users are stored in MongoDB. This allows us to efficiently manage and query chat data for various livestream channels.

### User Information

User-specific information such as `userName`, `displayName`, and `profilePictureUrl` is updated globally across all chat livestream channels. This means that any changes to a user's profile will be reflected in all channels they participate in.

### Channel-Specific Information

Channel-specific information such as `badges`, `badgeInfo`, `isBroadcaster`, `isSubscriber`, `isFounder`, `isMod`, `isVip`, and `isArtist` is stored within each individual message. This is because these attributes can vary between different chat livestream channels. For example, a user might be a moderator in one channel but not in another.

### TwitchChatMessage Model

The `TwitchChatMessage` model represents an individual chat message and includes the following fields:

- `id`: Unique identifier for the message.
- `date`: Timestamp of when the message was sent.
- `channelId`: Identifier for the channel where the message was sent.
- `isCheer`, `isRedemption`, `rewardId`, `isFirst`, `isReturningChatter`, `isHighlight`, `isReply`: Various flags and identifiers related to the message.
- `parentMessageId`, `parentMessageText`, `parentMessageUserId`, `parentMessageUserName`, `parentMessageUserDisplayName`, `threadMessageId`, `threadMessageUserId`: Information related to message threads and replies.
- `bits`: Number of bits used in the message.
- `emoteOffsets`: Map of emote offsets in the message.
- `isHypeChat`, `hypeChatAmount`, `hypeChatDecimalPlaces`, `hypeChatLocalizedAmount`, `hypeChatCurrency`, `hypeChatLevel`, `hypeChatIsSystemMessage`: Information related to hype chats.
- `userInfo`: Reference to the `TwitchUser` who sent the message.
- `userDynamicFields`: Dynamic fields related to the user, such as badges and roles.

### TwitchUser Model

The `TwitchUser` model represents a user in the chat and includes the following fields:

- `userName`: Unique username of the user.
- `displayName`: Display name of the user.
- `profilePictureUrl`: URL of the user's profile picture.
- `userId`: Unique identifier for the user.
- `color`: Optional color associated with the user.
- `userType`: Optional type of the user (e.g., moderator, VIP).
- `history`: Array of historical data related to the user, including changes to their profile.
