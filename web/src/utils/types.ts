export interface Movie {
  actors: [];
  directors: [];
  escritors: [];
  otherTitles: [];
  _id: string;
  image: string;
  title: string;
  rating: string;
  year: string;
  titleOriginal: string;
  uuid: string;
  description: string;
  genres: { name: string; uuid: string; }[];
  countries: { name: string; uuid: string; }[];
  release: string;
  embedUrls: {
    server: string;
    url: string;
    priority: string;
  }[]
  index: number;
  episodes: {
    _id: string;
    title: string;
    season: number;
    episode: number;
    uuid: string;
    createdAt: string;
    updatedAt: string;
    serie: string;
  }[];
  createdAt: string;
  updatedAt: string;
}