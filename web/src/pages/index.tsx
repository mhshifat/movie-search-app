import { useCallback, useRef } from 'react';
import Page from '../components/common/Page';
import Tab from '../components/common/Tab';
import MovieList from '../components/modules/movies/MovieList';
import { useOnboardGuide } from '../providers/OnboardGuideProvider';

export default function Home() {
  const contentBodyRef = useRef<any>();
  const { startFromGuide } = useOnboardGuide();

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
      <div>
        <div className='skeletonDemo' onClick={() => {
          startFromGuide(1);
        }}>
          <img src="" className='loading' style={{ height: "10em", width: "100%" }} />
          <div style={{ padding: "1em 1.8em", display: "flex", flexDirection: "column", gap: "1em" }}>
            <h3 className='loading' style={{ width: "max-content" }}>Blog Title ... ... ... ...</h3>
            <p className='loading'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, voluptas.</p>
            <button className='loading' style={{ width: "max-content", background: "red", border: "none", padding: ".5em 2em" }}>Submit</button>
          </div>
        </div>
      </div>
    </Page>
  )
}