import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import Alert from "../components/alert";
// import { appwrite, userState } from '../store/global';
// import { useRecoilState } from 'recoil';
import { account } from '@/utils/appwrite';
import { Models } from 'appwrite';
import PageHeader from './PageHeader';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [alert, setAlert] = useState("");
  const [user, setUser] = useState<Models.Session>();
  const router = useRouter();

  const signup = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      await account.create('unique()', email, password, name);
      await account.createEmailSession(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* {alert && <Alert message={alert} />} */}
      <section className="flex max-w-2xl mx-auto">
        <div className="flex-grow flex flex-col justify-center p-6">
          <PageHeader title="Sign up" />
          <form onSubmit={signup}>
            <label className="block mt-6"> Name</label>
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block mt-6"> Email</label>
            {/* “Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.”  */}
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block mt-6"> Password</label>
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-6">
              <button
                type="submit"
                disabled={!name || !email || !password}
                className="mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign Up
              </button>
              <p className="mt-4 ">
                Already have an account?{' '}
                <Link href="/login" className="cursor-pointer underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
