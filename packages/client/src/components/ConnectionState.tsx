type ConnectionStateProps = {
  socketConnected: boolean;
};

export const ConnectionState = ({ socketConnected }: ConnectionStateProps) => {
  return (
    <>
      <p>State: {"" + socketConnected}</p>;
    </>
  );
};
