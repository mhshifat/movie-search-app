import { Client } from "@elastic/elasticsearch";

const { ES_HOST = "http://localhost:9200" } = process.env;

export const esClient = new Client({
  node: ES_HOST
});