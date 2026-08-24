"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/journey" 
          className="flex items-center gap-2 group bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full hover:bg-white/[0.08] hover:border-primary/50 transition-all"
        >
          {session.user.image ? (
            <img src={session.user.image} alt={session.user.name || "User"} className="w-5 h-5 rounded-full" />
          ) : (
            <User className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" />
          )}
          <span className="text-xs uppercase tracking-widest font-bold text-white/70 group-hover:text-white transition-colors">
            Your Journey
          </span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-white/40 hover:text-red-500 transition-colors p-2"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/journey" })}
      className="text-xs uppercase tracking-widest font-bold border border-primary/50 text-primary px-5 py-2 rounded-full hover:bg-primary hover:text-black transition-all"
    >
      Preserve Journey
    </button>
  );
}
