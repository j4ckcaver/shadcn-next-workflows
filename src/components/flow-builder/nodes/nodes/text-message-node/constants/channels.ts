export enum MessageChannel {
  SMS = "sms",
  WHATSAPP = "whatsapp",
  MESSENGER = "messenger",
  TELEGRAM = "telegram",
}

export type MessageChannelType = `${MessageChannel}`;

export interface MessageChannelDetail {
  name: string;
  icon: string;
}

// @unocss-include
export const MessageChannelDetails: Record<
  MessageChannelType,
  MessageChannelDetail
> = {
  [MessageChannel.SMS]: { name: "SMS", icon: "Play" },
  [MessageChannel.WHATSAPP]: { name: "WhatsApp", icon: "Play" },
  [MessageChannel.MESSENGER]: { name: "Messenger", icon: "Play" },
  [MessageChannel.TELEGRAM]: { name: "Telegram", icon: "Play" },
};

export function getMessageChannelDetails(channel: MessageChannelType) {
  return MessageChannelDetails[channel];
}
