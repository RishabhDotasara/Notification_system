import { consumeMessage } from "../kafka/consumer";


export async function startEmailProcessor()
{
    console.log("[INFO] Email processor started");
    await consumeMessage("notifications.channel.email", "email-processor", async (message:any)=>{
        console.log("[INFO] Processing message from notifications.channel.email");
        const notification = JSON.parse(message.value.toString());
        console.log("[INFO] Notification: ", notification);
        // Here we can add the logic to process the notification
        // For now we are just going to log the notification
        console.log("[INFO] Notification processed: ", notification);

        // Add the notification to the kafka queue to be processed by the service processor.
        // Produce the notification we got to the specific kafka topic for channel processors.
    }
    )
    .catch((err) => {
        console.error("[ERROR] Error in sending notification to channel processor: ", err);
    }
    )
}