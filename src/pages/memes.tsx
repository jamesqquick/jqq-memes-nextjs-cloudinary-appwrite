import Meme from '@/components/Meme';
import PageHeader from '@/components/PageHeader';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { GetServerSideProps } from 'next';

interface MemesProps {
  memes: Meme[];
}

export default function memes({ memes }: MemesProps) {
  return (
    <>
      <PageHeader
        title="Community Memes"
        subtitle="The best memes from the community."
      />
      <div className="grid gap-10 my-10 lg:grid-cols-2">
        {memes.map(({ topText, bottomText, imageId }, i) => (
          <Meme
            topText={topText}
            bottomText={bottomText}
            imageId={imageId}
            key={i}
          />
        ))}
      </div>
    </>
  );
}

interface Meme {
  topText: string;
  bottomText: string;
  imageId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { documents } = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    process.env.NEXT_PUBLIC_APPWRITE_MEMES_COLLECTION || '',
    [Query.equal('approved', true)]
  );
  const memes = documents as unknown as Meme[];
  return {
    props: { memes }, // will be passed to the page component as props
  };
};
