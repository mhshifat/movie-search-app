import { initRbmq } from "./amqplib";
import { esClient } from "./elasticsearch";
import initExpress from "./express";

const { PORT = 8000 } = process.env;
class Loaders {
  private async loadRBMQ() {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        try {
          const connection = await initRbmq();
          console.log("RBMQ connection eatablished!");
          res(connection);
        } catch (err: unknown) {
          console.log(`Failed to connect to RBMQ: ${err}`);
          rej(err);
        }
      }, 0);
    })
  }

  private async loadElasticsearch() {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        try {
          const result = await esClient.ping({
            pretty: true,
          });
          console.log("Elastic search connection eatablished!");
          res(result);
        } catch (err: unknown) {
          console.log(`Failed to connect to elasticsearch: ${err}`);
          rej(err);
        }
      }, 0);
    })
  }

  private async loadExpress() {
    return new Promise((resolve) => {
      try {
        const app = initExpress();
        const server = app.listen(PORT);
        console.log(`Server listening on port ${PORT}`)
        resolve(server);
        server.on("error", (err) => {
          console.log(`Failed to connect to express: ${err}`);
        });
      } catch (err) {
        console.log(`Failed to connect to express: ${err}`);
      }
    })
  }

  private async loadConsumers() {
    return new Promise((resolve) => {
      try {
        require("../utils/consumers");
        console.log(`Consumers loaded`);
        resolve(true);
      } catch (err) {
        console.log(`Failed to load consumers: ${err}`);
      }
    })
  }

  private async loadJobs() {
    return new Promise((resolve) => {
      try {
        require("../utils/jobs");
        console.log(`Jobs loaded`);
        resolve(true);
      } catch (err) {
        console.log(`Failed to load jobs: ${err}`);
      }
    })
  }

  public async load() {
    await this.loadRBMQ();
    await this.loadConsumers();
    await this.loadJobs();
    await this.loadElasticsearch();
    await this.loadExpress();
  }
}

export default new Loaders();