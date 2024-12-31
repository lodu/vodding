export interface StartStreamRecording {
  streamerName: string;
  quality: "best" | "worst" | string;
}

export interface StreamRecordingResponse {
  success: boolean;
  message: string;
  details?: any;
}
