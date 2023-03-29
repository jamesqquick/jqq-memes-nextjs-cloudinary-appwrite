import '../../globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@/hooks/User';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <meta name="twitter:card" content="photo" />
        <meta name="twitter:site" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta
          name="twitter:description"
          content="Generate memes of James Q Quick"
        />
        <meta name="twitter:url" content="https://jqqmemes.com/" />
      </Head>
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
