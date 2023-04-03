import cloudinary from '@/utils/cloudinary';
import openai from '@/utils/openai';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    console.info('No id included in query');
    return res
      .status(403)
      .json({ err: 'Bad request: id query parameter is required' });
  }

  const image = await cloudinary.api.resource(`jqq-memes/${id}`, {
    max_results: 0,
  });
  const alt = image.context?.custom?.alt;

  console.log(alt);
  if (!alt) {
    console.log('No alt');
    return res.status(403).json({ err: 'Error!' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Can you generate text for one  meme relevant to these topics: JavaScript, Web Development, ddveloper interviews, and imposter syndrome? The meme can have two pieces of text, one on the top of the image and one on the bottom with a maximum of 25 characters each. Here is a description of the image: ${alt}. Can format the response as JSON with two properties: topText and bottomText?`,
        },
      ],
    });

    const memeText = JSON.parse(completion.data.choices[0].message.content);
    return res.status(200).json({ memeText });
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
    return res.status(403).json({ err: 'Error!' });
  }
};

export default handler;
