import JQQMeme from '@/components/JQQMeme';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="">
      <div className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
          <PageHeader
            title="Developer memes for everyone."
            subtitle="Make fun developer memes at the expense of the one and only, James Q Quick! He won't care...probably."
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

        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <p className="text-center">From This...</p>
            <JQQMeme
              imageId="24_jrrpwn"
              hasControls={false}
              hasBorder={false}
              showCloudinaryImage={true}
              topTextSize={80}
              bottomTextSize={80}
            />
          </div>
          <div>
            <p className="text-center font-bold">To this...</p>
            <JQQMeme
              imageId="24_jrrpwn"
              topText="I Like JavaScript"
              bottomText="I Think..."
              hasControls={false}
              showCloudinaryImage={true}
              topTextSize={80}
              bottomTextSize={80}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
