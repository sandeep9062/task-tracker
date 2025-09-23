"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-950 text-[#EBEBEB] antialiased overflow-hidden">
      {/* Background Gradients & Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#EF7722] rounded-full mix-blend-lighten filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FAA533] rounded-full mix-blend-lighten filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#0BA6DF] rounded-full mix-blend-lighten filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 text-center animate-fade-in-up p-6 rounded-xl backdrop-blur-md bg-gray-900/50 border border-gray-800/50 shadow-lg max-w-lg mx-auto">
        <Frown className="mx-auto h-24 w-24 text-gray-400 mb-6 animate-pulse-gentle" />
        <h1 className="mb-2 text-8xl font-extrabold text-[#EBEBEB] tracking-tight">
          404
        </h1>
        <p className="mb-8 text-xl text-gray-400 font-medium max-w-sm mx-auto">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button
            size="lg"
            className="h-14 px-8 text-lg bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-gray-950 font-medium hover:from-[#EF7722]/90 hover:to-[#FAA533]/90 transition-all duration-300 hover:scale-105"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
