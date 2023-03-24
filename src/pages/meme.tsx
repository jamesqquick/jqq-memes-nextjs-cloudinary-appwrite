import Meme from '@/components/Meme';
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/router';

export default function MemePage() {
  const router = useRouter();
  const { id, top, bottom } = router.query;
  if (
    typeof id !== 'string' ||
    (top && typeof top !== 'string') ||
    (bottom && typeof bottom !== 'string')
  ) {
    return <PageHeader title="Something went wrong..."></PageHeader>;
  }
  return (
    <>
      <PageHeader title="JQQ Meme"></PageHeader>
      <Meme imageId={id} topText={top} bottomText={bottom} includeOg={true} />
    </>
  );
}
