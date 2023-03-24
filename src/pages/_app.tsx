import '../../globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@/hooks/User';
import Header from '@/components/Header';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="p-4 md:px-20 min-h-screen">
        <div className="bg-white">
          <Header />

          <div className="max-w-4xl mx-auto">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
