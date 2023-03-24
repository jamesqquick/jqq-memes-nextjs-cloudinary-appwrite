import Meme from '@/components/Meme';
import PageHeader from '@/components/PageHeader';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

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
            <Link
              href="/create"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create a Meme
            </Link>
          </div>
        </div>

        <Meme imageId="50_nuzdle" />
      </div>
    </main>
  );
}
