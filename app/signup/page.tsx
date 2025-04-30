'use client';

import { signIn } from 'next-auth/react';
import { firebaseAuth } from '@/firebase/firebaseApp';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);

    try {
        const userCredential = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
        );
        const user = userCredential.user;
        console.log('Signup successful:', user);
        router.push('/');

    } catch (error: any) {
        console.error('Signup error:', error);
        if (error.code === "auth/email-already-in-use") {
            console.error("The email is already in use.");
        } else if (error.code === "auth/weak-password") {
            console.error("The password is too weak.");
        } else {
            console.error("An unexpected error occurred.");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[300px]">
      <h2 className="text-2xl font-bold">Signup</h2>
        <Button
            variant="outline"
            onClick={() => {
                signIn('google', {prompt: 'select_account'});
            }}
        >
            Signup with Google
        </Button>
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