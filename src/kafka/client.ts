import {Kafka} from 'kafkajs';

const kafkaClient = new Kafka({
    clientId:'notifications-service',
    brokers: ['localhost:9092'],
    retry: {
        retries: 5,
        initialRetryTime: 300,
        maxRetryTime: 5000,
    },
    logLevel: 2, // INFO
})

async function createTopic(topicname:string, partitions:number = 1, replicationFactor:number = 1)
{
    const admin = kafkaClient.admin();
    await admin.connect();
    const topics = await admin.listTopics();
    if (!topics.includes(topicname))
    {
        await admin.createTopics({
            topics: [{ topic: topicname, numPartitions: partitions, replicationFactor: replicationFactor }],
        });
        console.log(`Topic ${topicname} created`);
    }
    else
    {
        console.log(`Topic ${topicname} already exists`);
    }
    await admin.disconnect();
}

export {kafkaClient, createTopic};