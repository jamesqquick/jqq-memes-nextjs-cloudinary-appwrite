import { UseUser } from '@/hooks/User';
import { account } from '@/utils/appwrite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Logout() {
  const { logout } = UseUser();

  useEffect(() => {
    logout();
  }, []);
  return <div>Logging out...</div>;
}
