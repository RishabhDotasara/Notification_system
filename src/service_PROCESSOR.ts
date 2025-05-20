

// this will consume messages from the queue and put them to the specific channel processor topics.

import { consumeMessage } from "./kafka/consumer";
import { produceMessage } from "./kafka/producer";

export async function startAPIProcessor()
{
    await consumeMessage("notifications.incoming", "api-processor", async (message:any)=>{
        console.log("[INFO] Processing message from notifications.incoming");
        const notification = JSON.parse(message.value.toString());
        console.log("[INFO] Notification: ", notification);
        // Here we can add the logic to process the notification
        // For now we are just going to log the notification
        console.log("[INFO] Notification processed: ", notification);

        // Add the notification to the kafka queue to be processed by the service processor.
        // Produce the notification we got to the specific kafka topic for channel processors.
        produceMessage("notifications.channel." + "email", JSON.stringify(notification), 0)
        .then(() => {
            console.log("[INFO] Notification sent to channel processor: ", notification);
        }
        ).catch((err) => {
            console.error("[ERROR] Error in sending notification to channel processor: ", err);
        }
        )
    })
}