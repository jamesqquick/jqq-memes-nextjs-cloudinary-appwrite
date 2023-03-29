import MemeList from '@/components/MemeList';
import PageHeader from '@/components/PageHeader';
import { databases } from '@/utils/appwrite';
import { Meme } from '@/utils/types';
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
      <MemeList memes={memes} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { documents } = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    process.env.NEXT_PUBLIC_APPWRITE_MEMES_COLLECTION || ''
    // [Query.equal('approved', true)]
  );
  const memes = documents as unknown as Meme[];
  return {
    props: { memes }, // will be passed to the page component as props
  };
};
