// app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import taskHero from "@/public/task-hero.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EBEBEB] text-gray-900 font-sans antialiased overflow-hidden">
      {/* Background Gradients & Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#EF7722] rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FAA533] rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#0BA6DF] rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6 border-b border-gray-200/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#EF7722] to-[#FAA533] rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-gray-950" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Task Tracker</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white font-medium hover:from-[#EF7722]/90 hover:to-[#FAA533]/90 transition-all duration-300 shadow-md hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Content */}
          <div className="space-y-10 text-center lg:text-left animate-fade-in-up">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-gray-100/50 text-[#0BA6DF] px-5 py-2 rounded-full text-sm font-medium shadow-sm ring-1 ring-gray-200">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Your Productivity Companion</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter">
                Organize your tasks with{" "}
                <span className="bg-gradient-to-r from-[#0BA6DF] to-[#EF7722] bg-clip-text text-transparent">
                  intention
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                A delightful task management experience that makes productivity
                effortless. Track, organize, and celebrate your achievements with
                a friendly and engaging interface.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white hover:from-[#EF7722]/90 hover:to-[#FAA533]/90 transition-all duration-300 hover:scale-105 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg border-gray-200/50 bg-gray-100/50 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10">
              {[
                {
                  icon: <CheckCircle2 className="w-6 h-6 text-[#0BA6DF]" />,
                  title: "Easy Task Management",
                  desc: "Add, organize, and track your tasks effortlessly",
                  bg: "bg-[#0BA6DF]/10",
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-[#EF7722]" />,
                  title: "Beautiful Interface",
                  desc: "Enjoy a delightful, lovable design experience",
                  bg: "bg-[#EF7722]/10",
                },
                {
                  icon: <ArrowRight className="w-6 h-6 text-[#FAA533]" />,
                  title: "Stay Motivated",
                  desc: "Celebrate progress with encouraging feedback",
                  bg: "bg-[#FAA533]/10",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="text-center lg:text-left animate-fade-in-up delay-[100ms] group"
                >
                  <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-md ring-1 ring-gray-100/50 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-up">
            <div className="relative">
              <Image
                src={taskHero}
                alt="Task Tracker Dashboard Preview"
                className="w-full max-w-sm lg:max-w-xl object-contain drop-shadow-lg animate-float-slow"
                priority
              />
              {/* Floating decorative elements */}
              <div className="absolute -top-12 -right-8 w-16 h-16 bg-[#0BA6DF] rounded-full opacity-30 animate-pulse-gentle"></div>
              <div className="absolute -bottom-8 -left-12 w-10 h-10 bg-[#EF7722] rounded-full opacity-30 animate-pulse-gentle animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}