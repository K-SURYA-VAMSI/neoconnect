"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Navbar() {

 const router = useRouter();
 const [user, setUser] = useState(null);

 useEffect(() => {

    const fetchUser = async () => {

     try {

        const res = await api.get("/auth/me");

        setUser(res.data);

     } catch (error) {

        console.log(error);

     }

    };

    fetchUser();

 }, []);

 const formatRole = (role) => {
    if (!role) {
     return "";
    }

    return role
     .split("_")
     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
     .join(" ");
 };

 const logout = async () => {

  try {

   await api.post("/auth/logout");

   router.push("/login");

  } catch (error) {

   console.log(error);

  }

 };

 return (

  <div className="flex justify-between items-center px-8 py-4 border-b">

   <h1 className="text-lg font-semibold">
    NeoConnect
   </h1>

    <div className="flex items-center gap-4">

     {user && (
      <div className="text-right">
        <p className="text-sm font-medium leading-tight">{user.name}</p>
        <p className="text-xs text-gray-500 leading-tight">{formatRole(user.role)}</p>
      </div>
     )}

     <Button onClick={logout}>
      Logout
     </Button>

    </div>

  </div>

 );

}