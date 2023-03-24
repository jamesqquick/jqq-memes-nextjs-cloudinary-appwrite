import { account, client } from '@/utils/appwrite';
import { AppwriteException, Models } from 'appwrite';
import { useRouter } from 'next/router';
import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export interface UserState {
  user: Models.Account<Models.Preferences> | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  login: () => Promise<void>;
  signup: () => Promise<void>;
}

const defaultState: UserState = {
  user: null,
  loading: true,
  error: null,
  logout: async () => {},
  signup: async () => {},
  login: async () => {},
};

const userContext = createContext<UserState>(defaultState);

type UserProviderProps = {
  children: ReactNode;
};
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<Models.Account<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const loadAccount = async () => {
    try {
      const loadedAccount = await account.get();
      setUser(loadedAccount);
    } catch (error) {
      console.error(error);
      setError('failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      await loadAccount();
      router.push('/');
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      console.error(appwriteException.message);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const session = await account.create('unique()', email, password, name);
      setUser(session);
      await account.createEmailSession(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    loadAccount();
  }, []);
  return (
    <userContext.Provider
      value={{ user, loading, error, logout, login, signup }}
    >
      {children}
    </userContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext<UserState>(userContext);
  return context;
};
