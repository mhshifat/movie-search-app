import amqplib from "amqplib";

const { RBMQ_HOST = "amqp://localhost" } = process.env;

export function initRbmq() {
  return amqplib.connect(RBMQ_HOST);
}
