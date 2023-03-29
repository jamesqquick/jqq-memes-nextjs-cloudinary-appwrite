import Meme from '@/components/JQQMeme';
import PageHeader from '@/components/PageHeader';
import { GetServerSideProps } from 'next/types';

interface MemePageProps {
  id: string;
  top?: string;
  bottom?: string;
}

export default function MemePage({ id, top, bottom }: MemePageProps) {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.params?.id,
      top: context.params?.top,
      bottom: context.params?.bottom,
    },
  };
};
