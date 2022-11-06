import { useRouter } from "next/router";
import Page from "../components/common/Page";
import { useQuery } from 'react-query';
import { getMovie } from "../lib/axios";
import styles from "../styles/Movies.module.css";

export default function MovieDetails() {
  const { query } = useRouter();
  const { data } = useQuery([getMovie.name, {
    id: query?.["movie-uuid"] as string
  }], getMovie, {
    enabled: !!query?.["movie-uuid"]
  });

  return (
    <Page>
      <section className={styles.movieDetails}>
        <div className={styles.movieDetails__images}>
          <img src={data?.data.data.image || "https://via.placeholder.com/250x150"} alt="" />
        </div>
        <div className={styles.movieDetails__info}>
          <h3>{data?.data.data.title || "Movie Title"}</h3>
          <label>Description: </label>
          <p>{data?.data.data.description || "Movie Description"}</p>
          <label>Release: </label>
          <p>{data?.data.data.release || "0 0 0"}</p>
          <label>Rating: </label>
          <p>{data?.data.data.rating || "0 0 0"}</p>
          <label>Genres: </label>
          <p>{data?.data.data.genres.map(genra => <span key={genra.uuid}>{genra.name || "Genre"}</span>)}</p>
        </div>
      </section>
    </Page>
  )
}