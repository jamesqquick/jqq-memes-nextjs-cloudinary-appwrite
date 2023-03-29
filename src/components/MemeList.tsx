import { Meme } from '@/utils/types';
import JQQMeme from './JQQMeme';

interface MemeListProps {
  memes: Meme[];
}
export default function MemeList({ memes }: MemeListProps) {
  return (
    <div className="grid gap-4 my-10 md:grid-cols-2 lg:grid-cols-3">
      {memes.map(({ topText, bottomText, imageId }, i) => (
        <JQQMeme
          topText={topText}
          bottomText={bottomText}
          imageId={imageId}
          key={i}
        />
      ))}
    </div>
  );
}
