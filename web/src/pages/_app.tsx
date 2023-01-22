import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './../store';
import OnboardGuideProvider from '../providers/OnboardGuideProvider';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <OnboardGuideProvider>
          <Component {...pageProps} />
        </OnboardGuideProvider>
      </QueryClientProvider>
    </Provider>
  )
}
