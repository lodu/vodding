export type SocketEndpoint<TInput, TReturn> = {
  eventName: string;
  input: TInput;
  return: TReturn;
};
