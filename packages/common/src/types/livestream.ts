export type Livestream = {
  UUID: string;
  channelUUID: string;
  channelName: string;
  videoLength: number;
  videoWidth: number;
  videoHeight: number;
};

export type ChatMessage = {
  UUID: string;
  senderUUID: string;
  channelUUID: string;
  content: string;
};

export type Thread = {
  UUID: string;
  channelUUID: string;
  messages: ChatMessage[];
};
