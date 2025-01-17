import { Route, Routes } from "react-router-dom";
import { Replay } from "@/pages/Livestream/Replay/Replay";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import Channel from "@/pages/Channel/Channel";
import NotFoundPage from "@/pages/Error/404";
import { Button } from "@nextui-org/react";
import { Provider } from "./provider";

const App = () => {
  const [_, setSocketConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setSocketConnected(true);
    }

    function onDisconnect() {
      setSocketConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <Provider>
      {/* <main className={`${theme}`}> */}
      {/* <ConnectionState socketConnected={socketConnected} /> */}
      <Routes>
        <Route path="/" element={<Button variant="bordered"> sd </Button>} />
        <Route path=":channelName" element={<Channel />} />
        <Route path="livestream">
          <Route path="replay" element={<Replay />} />
          <Route path=":channelName/replay" element={<Replay />} />
          {/* <Route path=":channelName/chat" element={<Chat />} /> */}
        </Route>
        <Route path="404" element={<NotFoundPage />} />
      </Routes>
    </Provider>
  );
};

export default App;
