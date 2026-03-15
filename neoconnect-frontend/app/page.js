"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function Home() {
 const router = useRouter();

 useEffect(() => {
  const checkSession = async () => {
   try {
    await api.get("/auth/me");
    router.replace("/dashboard");
   } catch (error) {
    router.replace("/login");
   }
  };

  checkSession();
 }, [router]);

 return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
     <p className="text-sm text-slate-300">Checking session...</p>
  </div>
 );
}
