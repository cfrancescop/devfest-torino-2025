import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp();
}

const auth = getAuth();

export async function POST(req: NextRequest) {
  try {
    const { action, email, password } = await req.json();

    if (!action || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'register': {
        const userRecord = await auth.createUser({
          email,
          password,
        });

        return NextResponse.json({ uid: userRecord.uid }, { status: 201 });
      }

      case 'login': {
        // In a real application, you would not use the Admin SDK for login directly.
        // Instead, you would use the client-side Firebase SDK for sign-in and
        // then verify the ID token on the server side.
        // This is a simplified example for demonstration purposes only.
          
        // Use firebase client to login and then use the token to authenticate.
        return NextResponse.json({ message: 'Login not implemented with admin sdk, please use the firebase client sdk'}, {status: 501})
       
      }

      case 'logout': {
        // In a real application, you would not use the Admin SDK for logout.
        // Logout is typically handled on the client side by clearing the user session.
        // This is a placeholder for demonstration purposes only.
        return NextResponse.json({ message: 'Logout not implemented with admin sdk, please use the firebase client sdk' }, { status: 501 });
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