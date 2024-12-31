import { useRef, useState } from "react";
import VideoPlayer from "../../../components/VideoPlayers";
import Player from "video.js/dist/types/player";

type ReplayProps = {};
export const Replay = ({}: ReplayProps) => {
  const playerRef = useRef<Player | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;
    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });
    player.on("dispose", () => {
      console.log("player will dispose");
    });
    player.on("timeupdate", () => {
      setCurrentTime(player.currentTime() || currentTime);
    });
  };
  return (
    <>
      <VideoPlayer
        source="http://localhost:3000/"
        onReady={handlePlayerReady}
      />
      {"sd"}
      {currentTime}
    </>
  );
};
