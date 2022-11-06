import { SearchTotalHits } from "@elastic/elasticsearch/lib/api/typesWithBodyKey";
import axios from "axios";
import { Movie } from "../../../types/interfaces";
import { RBMQPublisherIns } from "../../../utils/publisher";
import { esClient } from './../../../loaders/elasticsearch';

export const moviesService = {
  async getMovie(param: string) {
    try {
      const { hits: { hits } } = await esClient.search({
        index: "movies",
        query: {
          bool: {
            must: [{
              match: {
                uuid: param || ""
              }
            }],
            should: [{
              match: {
                docId: param || ""
              }
            }]
          }
        }
      });
      return hits[0]._source;
    } catch (err) {
      console.log(err);
    }
  },
  async getMovies(page: number) {
    const options = {
      method: 'GET',
      url: 'https://movies-app1.p.rapidapi.com/api/movies',
      params: {page},
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    };

    return axios.request(options).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.error(error);
    });
  },
  async getMoviesFromES({
    page,
    limit,
    search
  }: {
    page: number;
    limit: number;
    search: string;
  }) {
    const { hits: { hits, total } } = await esClient.search({
      index: "movies",
      size: limit,
      from: (limit * page) - limit,
      ...search?{
        query: {
          query_string: {
            default_field: "title",
            query: search
          }
        }
      }:{}
    });
    return {
      results: hits.map(({ _source }) => _source),
      total_results: (total as SearchTotalHits)?.value,
      total_pages: Math.ceil(parseInt((total as SearchTotalHits)?.value as unknown as string) / limit)  
    };
  },
  async searchMovies(search: string) {
    const result = await esClient.search({
        query: {
          bool: {
            must: [{
              wildcard: {
                title: {
                  value: `${search}*`
                }
              }
            }],
          },
        }
      }); 
    return result;
  },
  async addMoviesTitleToElasticSearch(movies: Movie[]) {
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const { hits: { hits } } = await esClient.search({
        query: {
          match: {
            title: movie.title,
          }
        }
      });
      if (hits.length) return;
      
      await esClient.index({
        index: 'movies',
        document: {
          ...movie,
        }
      })
    }
  },
  async publishMoviesToQueue() {
    const { total_pages } = await this.getMovies(1);
    await RBMQPublisherIns.publish("GET_MOVIES", String(total_pages));
  }
}