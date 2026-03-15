"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {

 const router = useRouter();

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [checkingSession, setCheckingSession] = useState(true);

 useEffect(() => {

  const checkSession = async () => {

   try {

    await api.get("/auth/me");

    router.replace("/dashboard");

   } catch (error) {

    setCheckingSession(false);

   }

  };

  checkSession();

 }, [router]);

 const handleLogin = async () => {

  try {

   await api.post("/auth/login", {
    email,
    password
   });

   router.push("/dashboard");

  } catch (error) {

   alert("Login failed");

  }

 };

 if (checkingSession) {

  return (

    <div className="flex items-center justify-center min-h-screen bg-slate-950">
     <p className="text-sm text-slate-300">Checking session...</p>
   </div>

  );

 }

 return (

    <div className="flex items-center justify-center min-h-screen bg-slate-950">

     <Card className="p-8 w-[350px] space-y-4 bg-slate-900 border-slate-800">

    <h2 className="text-xl font-semibold text-center">
     NeoConnect Login
    </h2>

    <Input
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

    <Button
     className="w-full"
     onClick={handleLogin}
    >
     Login
    </Button>

    <p className="text-sm text-center text-slate-300">
     Don&apos;t have an account?{" "}
     <Link href="/register" className="text-cyan-400 underline">
      Register
     </Link>
    </p>

   </Card>

  </div>

 );

}