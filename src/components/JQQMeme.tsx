import useResize from '@/hooks/useResize';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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
  showCloudinaryImage?: boolean;
}

export default function JQQMeme({
  imageId,
  topText,
  bottomText,
  hasControls = true,
  hasBorder = true,
  topTextSize,
  bottomTextSize,
  showCloudinaryImage = false,
}: MemeProps) {
  const [bottomOverlay, setBottomOverlay] = useState<any | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [overlays, setOverlays] = useState<any[]>([]);
  const imageRef = useRef(null);
  const { width } = useResize(imageRef);
  console.log(width);
  const updateOverlays = () => {
    const tempOverlays = [];

    if (topText) {
      tempOverlays.push({
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
    }
    if (bottomText) {
      tempOverlays.push({
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
    }
    const updatedImageURL = getCldImageUrl({
      width: '960',
      height: '540',
      src: `jqq-memes/${imageId}`,
      crop: 'fill',
      overlays: tempOverlays,
    });
    setImageURL(updatedImageURL);
    setOverlays(tempOverlays);
  };

  useEffect(() => {
    updateOverlays();
  }, [topText, bottomText, imageId, topTextSize, bottomTextSize]);

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
      ref={imageRef}
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
      {!showCloudinaryImage && (
        <div className="relative">
          <Image
            src={`https://res.cloudinary.com/jamesqquick/image/upload/c_fill,w_960,h_540,g_auto/f_auto/q_auto/v1/jqq-memes/${imageId}`}
            height={540}
            width={960}
            alt="Meme of James Q Quick"
          />
          {topText && (
            <p
              style={{
                fontSize: `${topTextSize * (width / 960)}px`,
                WebkitTextStroke: `${width < 500 ? 2 : 4}px black`,
                top: hasBorder ? '10px' : '-10px',
              }}
              className={`text-white  absolute text-center w-full px-4 font-bold font-mono `}
            >
              {topText}
            </p>
          )}
          {bottomText && (
            <p
              style={{
                fontSize: `${bottomTextSize * (width / 960)}px`,
                WebkitTextStroke: `${width < 500 ? 2 : 4}px black`,
                bottom: hasBorder ? '10px' : '-10px',
              }}
              className={`text-white absolute text-center w-full px-4 font-bold font-mono  `}
            >
              {bottomText}
            </p>
          )}
        </div>
      )}

      {showCloudinaryImage && (
        <CldImage
          width="960"
          height="540"
          crop="fill"
          src={`jqq-memes/${imageId}`}
          alt={`Freezeframe of James Q Quick with top text ${topText} and bottom text ${bottomText}`}
          overlays={overlays}
          className="rounded-lg"
        />
      )}
      {hasControls && (
        <div
          className={`absolute flex flex-col gap-4 top-[50%] translate-y-[-50%] right-4 ${
            width < 500 ? 'scale-50' : 'scale-100'
          }`}
        >
          <Icon
            className={`bg-green-500`}
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
