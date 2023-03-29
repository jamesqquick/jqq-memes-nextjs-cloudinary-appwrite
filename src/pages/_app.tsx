import '../../globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@/hooks/User';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <div className="p-4 md:px-20 ">
          <div className="bg-white">
            <Header />

            <div className="max-w-6xl mx-auto">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}
