import { Connection, ConsumeMessage, Message } from "amqplib";
import { initRbmq } from "../loaders/amqplib";
import { QUEUE_NAMES } from "./constants";

class RBMQPublisher {
  private client: Connection | null = null;

  constructor() {
    initRbmq().then((res) => {
      this.client = res;
    });
  }

  async getClient() {
    if (!this.client) return initRbmq().then((conn) => {
      this.client = conn;
      return conn;
    });
    return this.client;
  }

  async publish(queueName: keyof typeof QUEUE_NAMES, message: string) {
    try {
      const channel = await this.client?.createChannel();
      if (!channel) throw new Error("RabbitMQ connection not found");
      await channel.assertQueue(queueName, {
        durable: false
      });
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log(`${queueName} published to queue`);
    } catch (err) {
      console.log(`${queueName} failed to published to queue ${err}`);
    }
  }
  
  async consume<TData>(queueName: keyof typeof QUEUE_NAMES, cb: (data: TData | null) => void) {
    const channel = await this.client?.createChannel();
    if (!channel) throw new Error("RabbitMQ connection not found");
    await channel.assertQueue(queueName, {
      durable: false
    });
    
    return channel.consume(queueName, function(msg) {
      if (msg !== null) {
        cb(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      }
    })
  }
}

export const RBMQPublisherIns = new RBMQPublisher();