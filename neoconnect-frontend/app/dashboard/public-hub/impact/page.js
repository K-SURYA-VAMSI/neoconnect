"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import api from "@/services/api";

export default function PublicHubPage() {

 const [summary, setSummary] = useState({
  totalResolved: 0,
  resolvedLast90Days: 0,
  openEscalated: 0
 });
 const [topImpactAreas, setTopImpactAreas] = useState([]);
 const [recentResolutions, setRecentResolutions] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {

  const fetchImpactData = async () => {

   try {

    const res = await api.get("/analytics/public-hub/impact");

    setSummary(res.data.summary);
    setTopImpactAreas(res.data.topImpactAreas || []);
    setRecentResolutions(res.data.recentResolutions || []);

   } catch (error) {

    console.log(error);

   } finally {

    setLoading(false);

   }

  };

  fetchImpactData();

 }, []);

 const formatDate = (dateValue) => {
  return new Date(dateValue).toLocaleDateString();
 };

 return (

  <div className="p-10 space-y-6">

   <h1 className="text-2xl font-bold">
        Impact Tracking
   </h1>

     <div className="grid gap-4 md:grid-cols-3">

        <Card className="p-6">
         <p className="text-sm text-gray-500">Total Resolved</p>
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
         <p className="text-sm text-gray-500">Open Escalated</p>
         <p className="text-2xl font-bold mt-1">
            {loading ? "..." : summary.openEscalated}
         </p>
        </Card>

     </div>

     <Card className="p-6 space-y-3">

    <h2 className="font-semibold mb-2">
         Top Impact Areas
    </h2>

        {topImpactAreas.length === 0 && (
         <p className="text-sm text-gray-600">No resolved impact data yet.</p>
        )}

        {topImpactAreas.map((item, index) => (
         <div
            key={`${item._id.department}-${item._id.category}-${index}`}
            className="flex items-center justify-between border rounded p-3"
         >
            <p className="text-sm">
             {item._id.department} / {item._id.category}
            </p>
            <p className="font-semibold">{item.resolvedCount}</p>
         </div>
        ))}

   </Card>

     <Card className="p-6 space-y-3">

    <h2 className="font-semibold mb-2">
         Recent Resolutions
    </h2>

        {recentResolutions.length === 0 && (
         <p className="text-sm text-gray-600">No recent resolved cases found.</p>
        )}

        {recentResolutions.map((item) => (
         <div
            key={item._id}
            className="border rounded p-3 space-y-1"
         >
            <p className="text-sm font-medium">{item.trackingId} - {item.title}</p>
            <p className="text-xs text-gray-500">
             {item.department} / {item.category} - Resolved on {formatDate(item.updatedAt)}
            </p>
         </div>
        ))}

   </Card>

  </div>

 );

}