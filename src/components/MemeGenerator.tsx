import { useState, useEffect } from 'react';
import { databases } from '../utils/appwrite';
import { ID } from 'appwrite';
import { UseUser } from '@/hooks/User';
import { BsShuffle } from 'react-icons/bs';

import JQQMeme from './JQQMeme';
import Icon from './Icon';
import Link from 'next/link';
import PageHeader from './PageHeader';

const getRandomImageIndex = (imageIds: string[]) => {
  return Math.floor(Math.random() * imageIds.length);
};

interface MemeGeneratorProps {
  imageIds: string[];
}
export default function MemeGenerator({ imageIds }: MemeGeneratorProps) {
  //TODO:util function to generate url
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [topTextSize, setTopTextSize] = useState(80);
  const [bottomTextSize, setBottomTextSize] = useState(80);
  const [topTextSizeInput, setTopTextSizeInput] = useState(80);
  const [bottomTextSizeInput, setBottomTextSizeInput] = useState(80);
  const [topTextInput, setTopTextInput] = useState<string>('');
  const [bottomTextInput, setBottomTextInput] = useState<string>('');
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { user, loading, error } = UseUser();

  useEffect(() => {
    setImageIndex(getRandomImageIndex(imageIds));
  }, []);

  useEffect(() => {
    if (isDebouncing) {
      return;
    }
    if (topTextInput) {
      setTopText(topTextInput);
    } else {
      setTopText('');
    }
    if (bottomTextInput) {
      setBottomText(bottomTextInput);
    } else {
      setBottomText('');
    }

    setTopTextSize(topTextSizeInput);
    setBottomTextSize(bottomTextSizeInput);
  }, [
    isDebouncing,
    topText,
    topTextInput,
    bottomText,
    bottomTextInput,
    topTextSizeInput,
    bottomTextSizeInput,
  ]);

  const updateTimer = () => {
    setIsDebouncing(true);
    setIsImageLoaded(false);
    if (timer) {
      clearTimeout(timer);
    }
    const id = setTimeout(() => {
      setIsDebouncing(false);
    }, 1000);
    setTimer(id);
  };

  const handleTopTextChange = (event: any) => {
    setTopTextInput(event.currentTarget.value);
    updateTimer();
  };

  const handleBottomTextChange = (event: any) => {
    setBottomTextInput(event.currentTarget.value);
    updateTimer();
  };

  const handleTopTextSizeChange = (event: any) => {
    setTopTextSizeInput(event.currentTarget.value);
    updateTimer();
  };

  const handleBottomTextSizeChange = (event: any) => {
    setBottomTextSizeInput(event.currentTarget.value);
    updateTimer();
  };

  const handleSave = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) {
      return;
    }
    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
        process.env.NEXT_PUBLIC_APPWRITE_MEMES_COLLECTION || '',
        ID.unique(),
        {
          imageId: imageIndex ? imageIds[imageIndex] : null,
          userID: user.$id,
          topText,
          bottomText,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnLoadingComplete = (img: HTMLImageElement) => {
    setTimeout(() => {
      setIsImageLoaded(true);
    }, 1000);
  };

  const handleShuffle = () => {
    const randomIndex = getRandomImageIndex(imageIds);
    setImageIndex(randomIndex);
    setIsImageLoaded(false);
  };

  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <PageHeader
          title="Generate A Meme"
          subtitle="To create a meme, changes the image with the left and right arrows and
          enter either top and/or bottom text. You can then download the meme,
          share it to Twitter, or save it to your account if you're logged
          in."
        />
        <p className="mt-6 text-lg leading-8 text-gray-600"></p>
      </div>
      <form
        className="w-full mt-16 max-w-[960px] mx-auto"
        onSubmit={handleSave}
      >
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2 mb-4">
          <div>
            <label
              htmlFor="topText"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Top Text
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                value={topTextInput}
                name="topText"
                id="topText"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleTopTextChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="topTextSize"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Top Text Size
            </label>
            <div className="mt-2.5">
              <input
                type="range"
                min={40}
                max={140}
                value={topTextSizeInput}
                name="topTextSize"
                id="topTextSizea"
                className="block w-full rounded-md py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleTopTextSizeChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="bottomText"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Bottom Text
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                value={bottomTextInput}
                name="bottomText"
                id="bottomText"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleBottomTextChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="bottomTextSize"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Bottom Text Size
            </label>
            <div className="mt-2.5">
              <input
                type="range"
                min={40}
                max={140}
                value={bottomTextSizeInput}
                name="bottomTextSize"
                id="bottomTextSizea"
                className="block w-full rounded-md py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleBottomTextSizeChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center relative mb-4 rounded-lg  aspect-video">
          {imageIndex && !isDebouncing && (
            <>
              <JQQMeme
                topText={topText}
                bottomText={bottomText}
                imageId={imageIds[imageIndex]}
                onLoadingCompleteCallback={handleOnLoadingComplete}
                hasBorder={false}
                topTextSize={topTextSize}
                bottomTextSize={bottomTextSize}
              />
              <div className="flex justify-between absolute right-4 top-4">
                <Icon
                  isButton={true}
                  handleClick={handleShuffle}
                  Icon={BsShuffle}
                  className="bg-indigo-500"
                />
              </div>
            </>
          )}
          {!isImageLoaded && (
            <>
              <div className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-blue-900 rounded-lg"></div>
              <div
                className="inline-block h-12 w-12 text-gray-100 animate-spin absolute top-1/2 rounded-full opacity-100 border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            </>
          )}
        </div>
        {!loading && user && (
          <button className="text-white text-lg rounded-md border-none bg-gray-600 px-4 py-2 hover:bg-gray-700">
            Save
          </button>
        )}
        {!loading && !user && (
          <Link
            href="/login"
            className="text-white text-lg rounded-md border-none"
          >
            Log in to save the meme
          </Link>
        )}
      </form>
    </>
  );
}
