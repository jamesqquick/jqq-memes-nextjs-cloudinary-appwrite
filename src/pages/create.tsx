import MemeGenerator from '@/components/MemeGenerator';
import cloudinary from '@/utils/cloudinary';
import { GetServerSideProps } from 'next';

export default function Create({ ids }: { ids: string[] }) {
  return (
    <div>
      <MemeGenerator imageIds={ids} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await cloudinary.search.expression('folder:jqq-memes').execute();
  const ids = res.resources.map((r: any) =>
    r.public_id.replace('jqq-memes/', '')
  );
  return {
    props: { ids },
  };
};
