import { CldImage, CldOgImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import Icon from './Icon';
import { TweetButton } from './TweetButton';

interface MemeProps {
  imageId: string;
  topText?: string;
  bottomText?: string;
  onLoadingCompleteCallback?: (image: HTMLImageElement) => void;
  hasControls?: boolean;
  includeOg?: boolean;
  hasBorder?: boolean;
}

export default function JQQMeme({
  imageId,
  topText,
  bottomText,
  onLoadingCompleteCallback,
  hasControls = true,
  includeOg = false,
  hasBorder = true,
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

  let shareURL = `${process.env.NEXT_PUBLIC_APP_URL}/meme?id=${imageId}`;
  if (topText) {
    shareURL += `&top=${topText}`;
  }
  if (bottomText) {
    shareURL += `&bottom=${bottomText}`;
  }
  const formattedURL = encodeURI(shareURL);

  return (
    <div
      className={`rounded-xl relative  ${
        hasBorder && 'bg-gradient-to-r'
      } from-cyan-500 to-indigo-600 p-2`}
    >
      {{ includeOg } && (
        <CldOgImage
          width="960"
          height="540"
          crop="fill"
          src={`jqq-memes/${imageId}`}
          alt={`Freezeframe of James Q Quick with top text ${topText} and bottom text ${bottomText}`}
          // @ts-ignore
          overlays={overlays}
        />
      )}
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
      {hasControls && (
        <div className="absolute flex flex-col gap-4 top-[50%] translate-y-[-50%] right-4">
          <Icon
            className="bg-green-500"
            href={imageURL}
            download={true}
            Icon={AiOutlineCloudDownload}
          ></Icon>
          <TweetButton
            tags={['JQQMemes']}
            url={formattedURL}
            title="JQQ Memes"
          />
        </div>
      )}
    </div>
  );
}
