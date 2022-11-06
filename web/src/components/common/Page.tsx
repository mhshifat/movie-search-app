import { ChangeEvent, cloneElement, PropsWithChildren, ReactElement, useCallback, useRef, useState } from 'react';
import styles from "../../styles/Page.module.css";
import { TbMovie } from "react-icons/tb";
import { BiCameraMovie } from "react-icons/bi";
import { BsChevronLeft, BsSearch } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setMovieSearch } from '../../store/moviesSlice';
import { useRouter } from 'next/router';

export interface PageProps extends PropsWithChildren {
  contentBodyRef?: any;
}

export default function Page({ children, contentBodyRef }: PageProps) {
  const { pathname, query, back } = useRouter();
  const functionRefs = useRef({
    dispatch: useDispatch<AppDispatch>()
  });
  const [typing, setTyping] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  const handleMovieSearch = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    if (typing) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          functionRefs.current.dispatch(setMovieSearch(target.value));
          setTyping(false);
        }, 1000)
      );
    } else {
      setTyping(true);
      if (target.value === "") {
        functionRefs.current.dispatch(setMovieSearch(target.value));
      }
    }
  }, [typing, timer])
  return (
    <section className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <BiCameraMovie />
        </div>
        <nav className={styles.navs}>
          <span className={styles.activeNav}>
            <TbMovie />
          </span>
        </nav>
      </aside>
      <main className={styles.content}>
        <header className={styles.contentHeader}>
          <span className={styles.breadcrumbHome} onClick={() => back()}><BsChevronLeft /></span>
          <ul className={styles.breadcrumb}>
            {pathname.startsWith("/") && <li>Movies</li>}
            {query?.["movie-uuid"] && <li>{String(query?.["movie-uuid"]).split("-").reduce((acc, val) => acc += " " + val.charAt(0).toUpperCase() + val.slice(1), "")}</li>}
          </ul>

          <form className={styles.search}>
            <BsSearch />
            <input type="search" onChange={handleMovieSearch} />
          </form>
        </header>

        <section className={styles.contentBody} ref={contentBodyRef}>
          {children}
        </section>
      </main>
    </section>
  )
}