import { useCallback, useRef } from 'react';
import Page from '../components/common/Page';
import Tab from '../components/common/Tab';
import MovieList from '../components/modules/movies/MovieList';
import { usePopup } from '../providers/PopupProvider';

export default function Home() {
  const contentBodyRef = useRef<any>();
  const { setTriggerRef, showPopup } = usePopup();

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
        <div ref={setTriggerRef} className='skeletonDemo' onClick={() => {
          showPopup({
            content: (
              <div>
                <p>Welcome to my tooltip.Welcome to my tooltip.Welcome to my tooltip.Welcome to my tooltip.Welcome to my tooltip.</p>
              </div>
            ),
          });
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