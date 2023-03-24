import { Client, Databases, Account } from 'appwrite';

const client = new Client();

if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  throw new Error('Must include Appwrite project id');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) {
  throw new Error('Must include Appwrite database ID');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_MEMES_COLLECTION) {
  throw new Error('Must include Appwrite Meme collectoin ID');
}

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };
