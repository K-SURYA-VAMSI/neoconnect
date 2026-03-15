"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {

 const router = useRouter();

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [department, setDepartment] = useState("");
 const [role, setRole] = useState("staff");
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

 const handleRegister = async () => {

  if (!name || !email || !password) {
   alert("Name, email and password are required");
   return;
  }

  try {

   await api.post("/auth/register", {
    name,
    email,
    password,
    role,
    department
   });

   alert("Registration successful. Please login.");

   router.push("/login");

  } catch (error) {

   alert(error.response?.data?.message || "Registration failed");

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

     <Card className="p-8 w-[380px] space-y-4 bg-slate-900 border-slate-800">

    <h2 className="text-xl font-semibold text-center">
     NeoConnect Registration
    </h2>

    <Input
     placeholder="Full Name"
     value={name}
     onChange={(e) => setName(e.target.value)}
    />

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

    <Input
     placeholder="Department (optional)"
     value={department}
     onChange={(e) => setDepartment(e.target.value)}
    />

    <select
     value={role}
     onChange={(e) => setRole(e.target.value)}
        className="w-full border border-slate-700 bg-slate-900 rounded-md p-2 text-sm"
    >
     <option value="staff">staff</option>
     <option value="secretariat">secretariat</option>
     <option value="case_manager">case_manager</option>
     <option value="admin">admin</option>
    </select>

    <Button
     className="w-full"
     onClick={handleRegister}
    >
     Register
    </Button>

    <p className="text-sm text-center text-slate-300">
     Already have an account?{" "}
     <Link href="/login" className="text-cyan-400 underline">
      Login
     </Link>
    </p>

   </Card>

  </div>

 );
}
