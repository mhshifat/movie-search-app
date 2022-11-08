import { QUEUE_NAMES } from "./constants";
import { RBMQPublisherIns } from "./publisher";
import { moviesService } from './../api/modules/movies/service';
import { Movie } from "../types/interfaces";

(async () => {
  const conn = await RBMQPublisherIns.getClient();

  conn?.createChannel()
    .then(async channel => {
      if (!channel) return;

      await channel.assertQueue(QUEUE_NAMES.GET_MOVIES, {
        durable: false
      });
      channel.consume(QUEUE_NAMES.GET_MOVIES, async (msg) => {
        for (let i = 0; i < +JSON.parse(msg?.content.toString() || ""); i++) {
          const movies = await moviesService.getMovies(i + 1);
          await moviesService.addMoviesTitleToElasticSearch(movies.results.map(({_id, ...movie}: Movie) => ({ ...movie, docId: _id })));
        }
      }, { noAck: true });
    })
})()