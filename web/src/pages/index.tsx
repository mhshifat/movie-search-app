import { useCallback, useRef } from 'react';
import Page from '../components/common/Page';
import Tab from '../components/common/Tab';
import MovieList from '../components/modules/movies/MovieList';

export default function Home() {
  const contentBodyRef = useRef<any>();

  const scrollToTop = useCallback(() => {
    contentBodyRef.current?.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return (
    <Page contentBodyRef={contentBodyRef}>
      <Tab
        items={[
          { label: "All", component: <MovieList onScrollToTop={scrollToTop} /> },
        ]}
      />
    </Page>
  )
}