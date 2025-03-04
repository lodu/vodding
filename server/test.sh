#!/bin/bash

# Define an associative array with the old and new filenames
declare -A files=(
  ["chatController.js"]="chat-controller.js"
  ["eventSubService.js"]="event-sub-service.js"
  ["videoRoutes.js"]="video-routes.js"
  ["twitchClient.js"]="twitch-client.js"
  ["chatRoutes.js"]="chat-routes.js"
  ["userController.js"]="user-controller.js"
  ["apiService.js"]="api-service.js"
  ["chatService.js"]="chat-service.js"
  ["mongooseClient.js"]="mongoose-client.js"
  ["twitchChatMessageService.js"]="twitch-chat-message-service.js"
  ["twitchChatUserService.js"]="twitch-chat-user-service.js"
  ["streamRecordWorker.js"]="stream-record-worker.js"
  ["channelRoutes.js"]="channel-routes.js"
  ["chatMessageService.js"]="chat-message-service.js"
  ["twitchChatMessage.js"]="twitch-chat-message.js"
  ["migrationClient.js"]="migration-client.js"
  ["twitchUser.js"]="twitch-user.js"
  ["requestLogger.js"]="request-logger.js"
  ["errorHandler.js"]="error-handler.js"
  ["chatUserService.js"]="chat-user-service.js"
  ["streamService.js"]="stream-service.js"
  ["userService.js"]="user-service.js"
  ["databaseService.js"]="database-service.js"
  ["TwitchChatUserService.js"]="twitch-chat-user-service.js"
  ["UerController.js"]="user-controller.js"
  ["TwitchChatMessageService.js"]="twitch-chat-message-service.js"
  ["MongooseClient.js"]="mongoose-client.js"
  ["TwitchUser.js"]="twitch-user.js"
  ["TwitchChatMessage.js"]="twitch-chat-message.js"
  ["MigrationClient.js"]="migration-client.js"
)

# Recursively find and update import statements in .js files
for old_name in "${!files[@]}"; do
  new_name=${files[$old_name]}
  find . -type f -name "*.ts" -exec sed -i "s|from ['\"]\([^'\"]*\)/$old_name['\"]|from '\1/$new_name'|g" {} +
done

echo "Import statements updated."