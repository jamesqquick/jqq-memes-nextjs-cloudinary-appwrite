import JQQMeme from '@/components/JQQMeme';
import PageHeader from '@/components/PageHeader';
import { CldOgImage } from 'next-cloudinary';
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
  const overlays = [];
  if (top) {
    overlays.push({
      width: 960,
      crop: 'fit',
      position: {
        y: 20,
        x: 0,
        gravity: 'north',
      },
      text: {
        color: 'white',
        fontFamily: 'Source Sans Pro',
        fontSize: 80,
        fontWeight: 'bold',
        stroke: true,
        border: '20px_solid_black',
        text: top,
      },
    });
    if (bottom) {
      overlays.push({
        width: 960,
        crop: 'fit',
        position: {
          y: 20,
          x: 0,
          gravity: 'south',
        },
        text: {
          color: 'white',
          fontFamily: 'Source Sans Pro',
          fontSize: 80,
          fontWeight: 'bold',
          stroke: true,
          border: '20px_solid_black',
          text: bottom,
        },
      });
    }
  }
  return (
    <>
      <PageHeader title="JQQ Meme"></PageHeader>
      <JQQMeme
        imageId={id}
        topText={top}
        bottomText={bottom}
        includeOg={true}
        topTextSize={80}
        bottomTextSize={80}
        showCloudinaryImage={true}
      />
      <CldOgImage
        width="960"
        height="540"
        crop="fill"
        src={`jqq-memes/${id}`}
        alt={`Freezeframe of James Q Quick with top text ${top} and bottom text ${bottom}`}
        twitterTitle={`Meme of James Q Quick`}
        // @ts-ignore
        overlays={overlays}
        keys={{}}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, top, bottom } = context.query;
  return {
    props: {
      id: id || '',
      top: top || '',
      bottom: bottom || '',
    },
  };
};
