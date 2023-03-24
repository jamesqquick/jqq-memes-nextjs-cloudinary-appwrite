import PageHeader from '@/components/PageHeader';
import { CldImage } from 'next-cloudinary';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto">
      <div className="lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
          <PageHeader
            title="JQQ Memes"
            subtitle="Use fun freezeframe images of James Q Quick quick to generate memes developers will never forget!"
          />
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/create"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create a Meme
            </a>
          </div>
        </div>

        <div className="rounded-xl bg-blue-500 p-2">
          <CldImage
            width="960"
            height="540"
            crop="fill"
            src="https://res.cloudinary.com/jamesqquick/image/upload/c_fill,w_960,h_540,g_auto/l_text:Source%20Sans%20Pro_80_bold_stroke:I%20Thought%20I%20Loved%20JavaScript,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_north/l_text:Source%20Sans%20Pro_80_bold_stroke:Now%20I'm%20Not%20Sure,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_south/f_auto/q_auto/v1/jqq-memes/50_nuzdle?_a=AVAAEDV0"
            alt="Freezeframe"
            className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>
      </div>
    </main>
  );
}
