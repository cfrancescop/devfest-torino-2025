import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '@/firebase/firebaseApp';

if (!getApps().length) {
  initializeApp();
}

const adminAuth = getAuth();

export async function POST(req: NextRequest) {
  try {
    const { action, email, password } = await req.json();

    if (!action || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' },
        { status: 400 }
      );
    }

    switch (action) {

      case 'login': {
        try {
          const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
          const user = userCredential.user;
          const idToken = await user.getIdToken();
          return NextResponse.json({
            idToken: idToken,
            uid: user.uid,
            email: user.email,
          }, { status: 200 });
          } catch (error) {
            console.error('Firebase client login error:', error);
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
          }
      }

      default: {
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}