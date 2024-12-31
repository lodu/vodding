import { useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

type VideoPlayerProps = {
  source: string;
  options?: Player["options"];
  onReady?: (arg0: Player) => void;
};

const VideoPlayer = ({ source, options, onReady }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [{ src: source, type: "video/mp4" }],
          ...options,
        },
        () => {
          onReady && onReady(player);
          console.log("play");
        },
      ));
    }
  }, [source, options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
