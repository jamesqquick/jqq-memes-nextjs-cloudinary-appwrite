import Meme from '@/components/Meme';
import PageHeader from '@/components/PageHeader';
import { CldOgImage } from 'next-cloudinary';
import { useRouter } from 'next/router';

export default function MemePage(props) {
  const router = useRouter();
  const { id, top, bottom } = router.query;

  return (
    <>
      <PageHeader title="JQQ Meme"></PageHeader>
      <Meme imageId={id} topText={top} bottomText={bottom} includeOg={true} />
    </>
  );
}
