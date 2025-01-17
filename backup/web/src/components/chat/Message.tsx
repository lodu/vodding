import { type VoddingTransmittedTwitchChatMessage } from "@vodding/common/chatTypes";
import TwitchIcon from "../Icons/TwitchIcon";

interface MessageProps {
  message: VoddingTransmittedTwitchChatMessage;
}

function Message({ message }: MessageProps) {
  return (
    <Card className="max-w-[100%] w-full p-2 mb-2 bg-gray-900 shadow-lg rounded-lg transition-transform hover:bg-gray-800">
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <img
            height={40}
            src={message.voddingMsg.userInfo.profilePictureUrl}
            alt={message.voddingMsg.userInfo.displayName}
            width={40}
            className="border-2 border-gray-700 rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold text-white">
              {message.voddingMsg.userInfo.displayName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <small className="text-gray-400">
            {new Date(message.voddingMsg.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </small>
          <Button
            startIcon={<TwitchIcon className="max-w-[40%]" color="gold" />}
            onClick={() =>
              window.open(`https://twitch.tv/${message.user}`, "_blank")
            }
            size="sm"
            className="text--500 hover:underline max-w-[50%] truncate"
            variant="link"
          />
        </div>
      </div>
      <Divider className="border-gray-700" />
      <div className="px-2 py-1 text-sm text-gray-300">
        <p>{message.text}</p>
      </div>
    </Card>
  );
}

export default Message;
