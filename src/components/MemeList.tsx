import { Meme } from '@/utils/types';
import JQQMeme from './JQQMeme';

interface MemeListProps {
  memes: Meme[];
}
export default function MemeList({ memes }: MemeListProps) {
  return (
    <div className="grid gap-4 my-10 ">
      {memes.map(
        ({ topText, bottomText, topTextSize, bottomTextSize, imageId }, i) => (
          <JQQMeme
            topText={topText}
            bottomText={bottomText}
            imageId={imageId}
            key={i}
            showCloudinaryImage={true}
            topTextSize={topTextSize}
            bottomTextSize={bottomTextSize}
          />
        )
      )}
    </div>
  );
}
