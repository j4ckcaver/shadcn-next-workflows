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
  [MessageChannel.SMS]: { name: "SMS", icon: "fa6-solid:comment-sms" },
  [MessageChannel.WHATSAPP]: { name: "WhatsApp", icon: "ri:whatsapp-fill" },
  [MessageChannel.MESSENGER]: { name: "Messenger", icon: "fontisto:messenger" },
  [MessageChannel.TELEGRAM]: {
    name: "Telegram",
    icon: "akar-icons:telegram-fill",
  },
};

export function getMessageChannelDetails(channel: MessageChannelType) {
  return MessageChannelDetails[channel];
}
