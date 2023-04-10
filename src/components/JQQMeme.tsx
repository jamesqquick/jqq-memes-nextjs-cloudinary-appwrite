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
  topTextSize: number;
  bottomTextSize: number;
}

export default function JQQMeme({
  imageId,
  topText,
  bottomText,
  onLoadingCompleteCallback,
  hasControls = true,
  includeOg = false,
  hasBorder = true,
  topTextSize,
  bottomTextSize,
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
          fontSize: topTextSize,
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
          fontSize: bottomTextSize,
          fontWeight: 'bold',
          stroke: true,
          border: '20px_solid_black',
          text: bottomText,
        },
      });
    } else {
      setBottomOverlay(null);
    }
  }, [topText, bottomText, bottomTextSize, topTextSize]);

  console.log(topTextSize, bottomTextSize);
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
      className={`rounded-xl relative max-w-[960px] mx-auto  ${
        hasBorder && 'bg-gradient-to-r p-2 from-cyan-500 to-indigo-600 '
      } `}
    >
      {/* {{ includeOg } && (
        <CldOgImage
          width="960"
          height="540"
          crop="fill"
          src={`jqq-memes/${imageId}`}
          alt={`Freezeframe of James Q Quick with top text ${topText} and bottom text ${bottomText}`}
          twitterTitle={`Meme of James Q Quick`}
          // @ts-ignore
          overlays={overlays}
        />
      )} */}
      <div className="relative">
        <img
          src="https://res.cloudinary.com/jamesqquick/image/upload/c_fill,w_960,h_540,g_auto/f_auto/q_auto/v1/jqq-memes/40_zdddqq?_a=AVABoDV0"
          height={540}
          width={960}
        />
        {topText && (
          <p
            style={{
              fontSize: `${topTextSize}px`,
              textShadow:
                '-5px 0px 3px black, 0px 5px 3px black, 5px 0px 3px black, 0px -5px 3px black',
            }}
            className={`text-white  absolute top-5 text-center w-full px-4 `}
          >
            {topText}
          </p>
        )}
        {bottomText && (
          <p
            style={{ fontSize: `${bottomTextSize}px` }}
            className={`text-white absolute bottom-5 text-center w-full px-4 drop-shadow-md `}
          >
            {bottomText}
          </p>
        )}
      </div>
      <CldImage
        width="960"
        height="540"
        crop="fill"
        src={`jqq-memes/${imageId}`}
        alt={`Freezeframe of James Q Quick with top text ${topText} and bottom text ${bottomText}`}
        // overlays={overlays}
        className="rounded-lg"
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
