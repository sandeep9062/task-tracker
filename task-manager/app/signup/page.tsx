"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSignupMutation } from "@/services/userApi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, User, Sparkles } from "lucide-react";
import { toast } from "sonner";
import taskHero from "@/public/task-hero.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { isLoading, isError, error }] = useSignupMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({ name, email, password }).unwrap();
      toast.success(
        "Welcome aboard! Your account has been created successfully."
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error("Failed to sign up:", err);
      // @ts-expect-error - RTK Query error shape is not well-defined
      const errorMessage = err.data?.error || "An error occurred during signup.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#EBEBEB] text-gray-900 flex items-center justify-center p-4 antialiased overflow-hidden">
      {/* Background Gradients & Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#EF7722] rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FAA533] rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#0BA6DF] rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Hero Section */}
        <div className="space-y-8 text-center lg:text-left animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">
              Join{" "}
              <span className="bg-gradient-to-r from-[#0BA6DF] to-[#EF7722] bg-clip-text text-transparent">
                Task Tracker
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Start your productivity journey with our delightful task
              management experience!
            </p>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Image
              src={taskHero}
              alt="Task Tracker Hero"
              className="w-80 h-80 object-contain animate-float"
              priority
            />
          </div>
        </div>

        {/* Signup Form */}
        <Card className="bg-white/50 backdrop-blur-md shadow-lg border border-gray-200/50 animate-fade-in-up">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 bg-[#0BA6DF]/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-[#0BA6DF]" />
            </div>
            <CardTitle className="text-3xl font-semibold text-gray-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Let&apos;s get you started on your productivity adventure!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 bg-gray-100/50 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-[#0BA6DF]/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-gray-100/50 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-[#0BA6DF]/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-gray-100/50 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-[#0BA6DF]/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-[#EF7722] to-[#FAA533] text-white hover:from-[#EF7722]/90 hover:to-[#FAA533]/90 hover:scale-[1.02] transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              {isError && (
                <p className="text-red-500 text-center">
                  {/* @ts-expect-error - RTK Query error shape is not well-defined */}
                  {error.data?.error || "An error occurred"}
                </p>
              )}
            </form>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#0BA6DF] hover:underline font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
