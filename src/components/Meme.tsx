import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import Icon from './Icon';
import { TweetButton } from './TweetButton';

interface MemeProps {
  imageId: string;
  topText?: string;
  bottomText?: string;
  onLoadingCompleteCallback?: (image: HTMLImageElement) => void;
}

export default function Meme({
  imageId,
  topText,
  bottomText,
  onLoadingCompleteCallback,
}: MemeProps) {
  const [topOverlay, setTopOverlay] = useState<any | null>(null);
  const [bottomOverlay, setBottomOverlay] = useState<any | null>(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (topText) {
      setTopOverlay({
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
          text: topText,
        },
      });
    } else {
      setTopOverlay(null);
    }
    if (bottomText) {
      setBottomOverlay({
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
          text: bottomText,
        },
      });
    } else {
      setBottomOverlay(null);
    }
  }, [topText, bottomText]);

  const overlays = [];
  if (topOverlay) {
    overlays.push(topOverlay);
  }
  if (bottomOverlay) {
    overlays.push(bottomOverlay);
  }

  const handleOnLoadingComplete = (img: HTMLImageElement) => {
    setImageURL(img.src);
    if (onLoadingCompleteCallback) onLoadingCompleteCallback(img);
  };

  return (
    <>
      <CldImage
        width="960"
        height="540"
        crop="fill"
        src={`jqq-memes/${imageId}`}
        alt={`Freezeframe of James Q Quick with top text ${topText} and bottom text ${bottomText}`}
        overlays={overlays}
        className="rounded-md"
        onLoadingComplete={handleOnLoadingComplete}
      />
      <div className="absolute flex flex-col gap-4 top-[50%] translate-y-[-50%] right-4">
        <Icon
          className="bg-green-500"
          href={imageURL}
          download={true}
          Icon={AiOutlineCloudDownload}
        ></Icon>
        <TweetButton
          tags={['#JQQMemes']}
          url={`/meme?topText=${top}&bottom=${bottomText}&id=${imageId}`}
          title="JQQ Memes"
        />
      </div>
    </>
  );
}
