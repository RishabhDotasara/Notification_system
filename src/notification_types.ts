import { z } from "zod";

export const NotificationSchema = z.object({
  userId: z.string(),
  employUserPreferences: z.boolean(),
  message: z.any(), // You can replace this with a more specific type if known
  channels: z.array(z.string()),
  notificationId: z.string(),
  notificationType: z.string(),
  sendAt: z.preprocess((val:any) => new Date(val as string), z.date()),
});

export type Notification = z.infer<typeof NotificationSchema>;


export const userChannelInfoSchema = z.object({
  channel_email: z.string(),
  channel_sms: z.string(),
  channel_push: z.string(),
  channel_webhook: z.string(),
})

export type UserChannelInfo = z.infer<typeof userChannelInfoSchema>;