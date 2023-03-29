# JQQ Memes Next.js Cloudinary Appwrite

This project is a meme generator that uses freeze frames images from James Q Quick's YouTube videos. The project is built with Next.js, Cloudinary, and Appwrite.

![Generate a meme dashboard](/images/meme1.jpg)

## Getting Started

To get started with this project, you can clone the repository to your local machine:

```bash
git clone https://github.com/jamesqquick/jqq-memes-nextjs-cloudinary-appwrite.git
```

After cloning the repository, navigate to the project directory and install the dependencies:

```bash
cd jqq-memes-nextjs-cloudinary-appwrite
npm install
```

Next, you'll need to set up the environment variables. Create a .env.local file in the project root and fill in the following variables:

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
APPWRITE_API_ENDPOINT=
APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
```

You can obtain the values for these variables by signing up for a free account at [Cloudinary](https://cloudinary.com/) and [Appwrite](https://appwrite.io/).

Once you've set up the environment variables, you can start the development server:

```bash
npm run dev
```

The development server should be running at http://localhost:3000.

## Usage

To use the meme generator, you can visit http://localhost:3000 in your web browser. From there, you can select a video and choose a freeze frame to use as the base for your meme. You can add text to the top and bottom of the image, and then generate your meme by clicking the "Generate Meme" button.

Once you've generated your meme, you can download it or share it on social media.

## Contributing

If you'd like to contribute to this project, you can fork the repository and submit a pull request. Before submitting a pull request, please make sure your changes are well-tested and follow the existing coding style.

## License

This project is licensed under the [MIT License](https://chat.openai.com/chat/LICENSE). See the LICENSE file for details.
