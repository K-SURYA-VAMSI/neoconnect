"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

export default function PublicHubPage() {

 const [summary, setSummary] = useState({
  totalResolved: 0,
  resolvedLast90Days: 0,
  openEscalated: 0
 });
 const [loading, setLoading] = useState(true);

 useEffect(() => {

  const fetchImpactSummary = async () => {

   try {

    const res = await api.get("/analytics/public-hub/impact");

    setSummary(res.data.summary);

   } catch (error) {

    console.log(error);

   } finally {

    setLoading(false);

   }

  };

  fetchImpactSummary();

 }, []);

 return (

  <div className="p-10 space-y-6">

   <h1 className="text-2xl font-bold">
    Public Hub
   </h1>

     <div className="grid gap-4 md:grid-cols-3">

        <Card className="p-6">
         <p className="text-sm text-gray-500">Resolved Cases</p>
         <p className="text-2xl font-bold mt-1">
            {loading ? "..." : summary.totalResolved}
         </p>
        </Card>

        <Card className="p-6">
         <p className="text-sm text-gray-500">Resolved in 90 Days</p>
         <p className="text-2xl font-bold mt-1">
            {loading ? "..." : summary.resolvedLast90Days}
         </p>
        </Card>

        <Card className="p-6">
         <p className="text-sm text-gray-500">Open Escalated Cases</p>
         <p className="text-2xl font-bold mt-1">
            {loading ? "..." : summary.openEscalated}
         </p>
        </Card>

     </div>

   <Card className="p-6">

    <h2 className="font-semibold mb-2">
     Quarterly Digest
    </h2>

    <p className="text-sm text-gray-600">
         Quarterly results now reflect live resolved-case metrics and impact trends.
    </p>

   </Card>

   <Card className="p-6">

    <h2 className="font-semibold mb-2">
     Transparency Updates
    </h2>

    <p className="text-sm text-gray-600">
        Live data from resolved complaints is available in Impact Tracking.
    </p>

   </Card>

   <Card className="p-6 space-y-4">

    <h2 className="text-lg font-semibold">
     Impact Tracking
    </h2>

    <p className="text-sm text-gray-600">
     View what was raised and what action was taken.
    </p>

    <Link href="/dashboard/public-hub/impact">
     <Button>Open Impact Tracking</Button>
    </Link>

   </Card>

   <Card className="p-6 space-y-4">

    <h2 className="text-lg font-semibold">
     Minutes Archive
    </h2>

    <p className="text-sm text-gray-600">
     Search and upload meeting minutes documents.
    </p>

    <Link href="/dashboard/public-hub/minutes">
     <Button>Open Minutes Archive</Button>
    </Link>

   </Card>

  </div>

 );

}