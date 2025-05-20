import { kafkaClient } from "./client";


async function createConsumer(topic: string, groupId: string) {
  const consumer = kafkaClient.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  return consumer;
}

async function consumeMessage(topic:string, groupId:string, callback: (message: any) => void) {
  const consumer = await createConsumer(topic, groupId);
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`[INFO] Consumed message from topic: ${topic}`);
      console.log(`[INFO] Message: ${message.toString()}`);
      callback(message);
    },
  });
}


export {consumeMessage };