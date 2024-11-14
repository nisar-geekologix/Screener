'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {

    
const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login');
  };
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/protected');

      if (res.status === 401) {
        router.push('/login');
      } else {
        const data = await res.json();
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>Protected content here...</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}


  
  
  