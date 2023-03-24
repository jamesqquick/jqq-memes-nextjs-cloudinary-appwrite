import Meme from '@/components/Meme';
import PageHeader from '@/components/PageHeader';
import { UseUser } from '@/hooks/User';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Memes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const { user, loading } = UseUser();
  const [loadingMemes, setLoadingMemes] = useState(false);
  const router = useRouter();

  const loadMemes = async (userID: string) => {
    const { documents } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_MEMES_COLLECTION || '',
      [Query.equal('approved', true), Query.equal('userID', userID)]
    );
    const memes = documents as unknown as Meme[];
    setMemes(memes);
    setLoadingMemes(false);
  };

  useEffect(() => {
    if (loading) return;

    if (!loading && !user) {
      router.push('/');
      return;
    } else if (user?.$id) {
      loadMemes(user?.$id);
    }
  }, [user, loading, router]),
    [];
  return (
    <>
      <PageHeader title="My Amazing Memes" />
      {loadingMemes && <p>Loading your amazing memes...</p>}
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
export interface Meme {
  topText: string;
  bottomText: string;
  imageId: string;
}
