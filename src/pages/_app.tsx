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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3b82f6" />
        <meta
          name="description"
          content="Generate memes using freeze frame images from James Q Quick's videos."
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
        <meta name="twitter:card" content="photo" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/jamesqquick/image/upload/c_fill,w_960,h_540,g_auto/l_text:Source%20Sans%20Pro_80_bold_stroke:What%20if%20I%20wrote,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_north/l_text:Source%20Sans%20Pro_80_bold_stroke:a%20Meme%20Generator%3F,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_south/f_auto/q_auto/v1/jqq-memes/50_nuzdle?_a=AVAAEDV0"
          key="ogimage"
        />
        <meta
          property="twitter:image:alt"
          content="Meme created with James Q Quick's face"
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/jamesqquick/image/upload/c_fill,w_960,h_540,g_auto/l_text:Source%20Sans%20Pro_80_bold_stroke:What%20if%20I%20wrote,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_north/l_text:Source%20Sans%20Pro_80_bold_stroke:a%20Meme%20Generator%3F,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_south/f_auto/q_auto/v1/jqq-memes/50_nuzdle?_a=AVAAEDV0"
          key="twitterimage"
        />

        <meta name="twitter:site" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta
          name="twitter:description"
          content="Generate memes of James Q Quick"
        />
        <meta name="twitter:url" content={process.env.NEXT_PUBLIC_APP_URL} />
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
