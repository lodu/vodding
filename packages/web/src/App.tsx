import { Route, Routes } from "react-router-dom";
import { Replay } from "./pages/Livestream/Replay/Replay";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import Chat from "./pages/Livestream/Chat";

const App = () => {
  const [socketConnected, setSocketConnected] = useState(socket.connected);

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
    <div className="container mx-auto">
      <ConnectionState socketConnected={socketConnected} />
      <Routes>
        <Route path="/">
          <Route path="livestream">
            <Route path="replay" element={<Replay />} />
            <Route path=":channelName">
              <Route path="replay" element={<Replay />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
