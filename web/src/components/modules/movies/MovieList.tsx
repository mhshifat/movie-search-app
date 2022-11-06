import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import { getMovies } from "../../../lib/axios";
import { AppState } from "../../../store";
import styles from "../../../styles/Movies.module.css";
import FloatingIcon from "../../common/FloatingIcon";
import RestQueryState from "../../common/RestQueryState";
import { Movie } from "../../../utils/types";

export interface MovieListProps {
  onScrollToTop?: () => void;
}

export default function MovieList({ onScrollToTop }: MovieListProps) {
  const router = useRouter();
  const observerElem = useRef<any>(null);
  const movieSearch = useSelector((state: AppState) => state.moviesState.search);
  
  const { isLoading, error, data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery<any>(
    [getMovies.name, {}],
    ({pageParam = 1}) => getMovies(pageParam, {
      search: movieSearch
    }),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.data?.data?.results?.length !== 0 ? pages?.[pages.length - 1]?.data?.data?.currentPage + 1 : undefined;
      },
    }
  );

  const handleObserver = useCallback((entries: any) => {
    const [target] = entries
    if(target.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  const functionRefs = useRef({
    refetch,
  })

  useEffect(() => {
    const element = observerElem.current as Element;
    if (!element) return;
    const option = { threshold: 0 }
  
    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element)
    return () => observer.unobserve(element)
  }, [fetchNextPage, hasNextPage, handleObserver])

  useEffect(() => {
    functionRefs.current.refetch();
  }, [movieSearch])

  return (
    <RestQueryState loading={isLoading} error={error}>
      <div className={styles.movies}>
        {data?.pages?.reduce((acc, val) => acc.concat(val?.data?.data?.results), [])?.map((movie: Movie, movieIdx: number) => (
          <div key={movieIdx} className={styles.movieItem} onClick={() => router.push(`/${movie.uuid}`)}>
            <img src={movie?.image || "https://via.placeholder.com/250x150"} width={"100%"} alt="" />
            <div className={styles.movieInfo}>
              <h3>{movie?.title || "Iron Man"}</h3>
              <p>Rating: {movie?.rating || "6.4/10"}</p>
              <p>Release: {movie?.release || "16 Jan 2015"}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.movieLoading} ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? 'Loading...' : ""}
      </div>
      <FloatingIcon onClick={onScrollToTop} />
    </RestQueryState>
  )
}