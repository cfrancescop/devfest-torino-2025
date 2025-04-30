import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { firebaseAuth } from '@/firebase/firebaseApp';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
      case 'register': {
        const userRecord = await adminAuth.createUser({
          email, password
        });

        return NextResponse.json({ uid: userRecord.uid }, { status: 201 });
      }

      case 'login': {
          try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            return NextResponse.json({ idToken: idToken }, {status: 200})
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