export interface TwitchEvent {
  subscription: Subscription;
  event: Event;
}

export interface Subscription {
  id: string;
  status: string;
  type: string;
  version: string;
  condition: Condition;
  transport: Transport;
  created_at: string;
}

export interface Condition {
  broadcaster_user_id: string;
}

export interface Transport {
  method: string;
  callback: string;
}

export interface Event {
  id: string;
  broadcasterUserId: string;
  broadcasterUserLogin: string;
  broadcasterUserName: string;
  type: string;
  startedAt: string;
}

export interface StreamOnlineEvent {
  broadcasterId: string;
  broadcasterLogin: string;
  broadcasterName: string;
  broadcasterDisplayName: string;
  startedAt: Date;
}
