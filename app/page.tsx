import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthButtons from "@/components/AuthButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen p-24 flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-6xl font-bold text-center">
          Devfest Torino 2025
        </h1>
        <p className="text-lg text-center">
          Join us for a day of learning and fun!
        </p>
      </div>

      {!session && <AuthButtons />}

      {session && (
        <div className="flex flex-col items-center justify-center gap-5">
          <p>
            Welcome {session.user?.name}!
          </p>
          <Link href="/profile">
            <Button>Go to Profile</Button>
          </Link>
        </div>
      )}

      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </div>
  );
}
