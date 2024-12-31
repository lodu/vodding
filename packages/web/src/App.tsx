import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Replay } from "./pages/Livestream/Replay/Replay";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import Chat from "./pages/Livestream/Chat";

const App = () => {
  const [socketConnected, setSocketConnected] = useState(socket.connected);
  const navigate = useNavigate();

  useEffect(() => {
    function onConnect() {
      setSocketConnected(true);
    }

    function onDisconnect() {
      setSocketConnected(false);
    }

    // function onFooEvent(value) {
    //   setFooEvents((previous) => [...previous, value]);
    // }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <>
      <NextUIProvider navigate={navigate}>
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
      </NextUIProvider>
    </>
  );
};

export default App;
