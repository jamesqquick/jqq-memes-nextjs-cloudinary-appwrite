import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';
// import Alert from "../components/alert";
import { useRouter } from 'next/router';
import { account } from '@/utils/appwrite';
import { AppwriteException } from 'appwrite';
import { UseUser } from '@/hooks/User';
import PageHeader from './PageHeader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = UseUser();
  const router = useRouter();

  const handleLogin = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      {/* {alert && <Alert message={alert} />} */}
      <section className="flex max-w-2xl mx-auto">
        <div className="flex-grow flex flex-col justify-center p-6">
          <PageHeader title="Login" />
          <form onSubmit={handleLogin}>
            <label className="block mt-6" htmlFor="email">
              {' '}
              Email
            </label>
            <input
              id="email"
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
              type="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block mt-6" htmlFor="password">
              {' '}
              Password
            </label>
            <input
              id="password"
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
              type="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-6">
              <button
                type="submit"
                disabled={!email || !password}
                className="mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login
              </button>
              <p className="mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="cursor-pointer underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
