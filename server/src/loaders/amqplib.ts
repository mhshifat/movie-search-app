import amqplib from "amqplib";

const { RBMQ_HOST = "amqp://localhost" } = process.env;

export async function initRbmq() {
  return await amqplib.connect(RBMQ_HOST);
}
