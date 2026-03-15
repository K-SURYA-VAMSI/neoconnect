"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

export default function DashboardPage() {

 const router = useRouter();
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {

  const fetchUser = async () => {

   try {

    const res = await api.get("/auth/me");

    setUser(res.data);

   } catch (error) {

    router.replace("/login");

   } finally {

    setLoading(false);

   }

  };

  fetchUser();

 }, [router]);

 if (loading) {

  return (

   <div className="p-10">
  <p className="text-sm text-gray-600">Loading dashboard...</p>
   </div>

  );

 }

 return (

  <div className="p-10 space-y-6">

   <h1 className="text-2xl font-bold">
    NeoConnect Dashboard
   </h1>

   <div className="grid grid-cols-3 gap-6">

 {/* Staff */}

 {user?.role === "staff" && (

  <Card className="p-6 space-y-4">
   <h2 className="text-lg font-semibold">Submit Complaint</h2>

   <Link href="/complaints">
    <Button>Open</Button>
   </Link>
  </Card>

 )}

 {/* Staff */}

 {user?.role === "staff" && (

  <Card className="p-6 space-y-4">
   <h2 className="text-lg font-semibold">Polls</h2>

   <Link href="/dashboard/polls">
    <Button>Open</Button>
   </Link>
  </Card>

 )}

 {/* Secretariat */}

 {user?.role === "secretariat" && (

  <Card className="p-6 space-y-4">
   <h2 className="text-lg font-semibold">Manage Complaints</h2>

   <Link href="/dashboard/complaints">
    <Button>Open</Button>
   </Link>
  </Card>

 )}

 {/* Secretariat */}

 {user?.role === "secretariat" && (

  <Card className="p-6 space-y-4">
   <h2 className="text-lg font-semibold">Analytics</h2>

   <Link href="/dashboard/analytics">
    <Button>Open</Button>
   </Link>
  </Card>

 )}

 {/* Case Manager */}

 {user?.role === "case_manager" && (

  <Card className="p-6 space-y-4">
   <h2 className="text-lg font-semibold">My Cases</h2>

   <Link href="/dashboard/my-cases">
    <Button>Open</Button>
   </Link>
  </Card>

 )}

{user?.role === "secretariat" && (

 <Card className="p-6 space-y-4">

  <h2 className="text-lg font-semibold">
   Create Poll
  </h2>

  <p className="text-sm text-gray-500">
   Create polls for staff voting.
  </p>

  <Link href="/dashboard/create-poll">
   <Button>Create</Button>
  </Link>

 </Card>

)}

 {/* Public Hub */}

 {user && (

  <Card className="p-6 space-y-4">

   <h2 className="text-lg font-semibold">Public Hub</h2>

   <Link href="/dashboard/public-hub">
    <Button>Open</Button>
   </Link>

  </Card>

 )}

 {/* Admin */}

 {user?.role === "admin" && (

  <Card className="p-6 space-y-4">

   <h2 className="text-lg font-semibold">User Management</h2>

   <Link href="/dashboard/users">
    <Button>Open</Button>
   </Link>

  </Card>

 )}


</div>

  </div>

 );

}