'use client';

import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function AuthButtons() {
  const { data: session } = useSession();
  const isLogin = true;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    const action = isLogin ? 'login' : 'register';

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (isLogin) {
          // Implement a way to store idToken or use cookies.
          console.log('Login successful:', data);
        } 
      } else {
        const data = await response.json()
        console.error('Authentication failed:', data.error);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="flex gap-5">
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px]">
      <div className='flex gap-4'>
          <Button
              variant="outline"
              onClick={() => {
                signIn('google');
              }}
          >
              Login with Google
          </Button>
          <Link href="/signup">Signup</Link>
      </div>
      
      <h2 className="text-2xl font-bold">
        Login
      </h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value) }
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleAuth} disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </Button>
    </div>
  );
}