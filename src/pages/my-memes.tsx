import MemeList from '@/components/MemeList';
import PageHeader from '@/components/PageHeader';
import { UseUser } from '@/hooks/User';
import { databases } from '@/utils/appwrite';
import { Meme } from '@/utils/types';
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
      [Query.equal('userID', userID)]
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
      <MemeList memes={memes} />
    </>
  );
}
