'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const action = 'register';

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
        console.log('Signup successful:', data);
        // Redirect to login page after signup
      } else {
        const data = await response.json();
        console.error('Authentication failed:', data.error);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px]">
      <h2 className="text-2xl font-bold">Signup</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignup} disabled={loading}>
        {loading ? 'Loading...' : 'Signup'}
      </Button>
      <Link href="/">
        <Button variant='link'>Back to Login</Button>
      </Link>
    </div>
  );
}