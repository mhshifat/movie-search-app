import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { Movie } from "../utils/types";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI
});

export const getMovies = (page: number, queryParams: any) => {
  return axiosClient.get("/movies", {
    params: {
      page,
      ...queryParams
    }
  })
}

export const getMovie = ({ queryKey }: QueryFunctionContext<[string, { id: string }]>) => {
  const [_, { id }] = queryKey;
  return axiosClient.get<{ seccess: boolean; data: Movie }>(`/movies/${id}`);
}

export const searchMovies = ({ queryKey }: any) => {
  const [_, { search }] = queryKey;
  return axiosClient.get("/movies/search", {
    params: {
      search
    }
  })
}