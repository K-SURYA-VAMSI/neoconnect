"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

import { Card } from "@/components/ui/card";

import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer
} from "recharts";

export default function AnalyticsPage() {

 const [statusStats, setStatusStats] = useState([]);
 const [departmentStats, setDepartmentStats] = useState([]);

 useEffect(() => {

    const loadAnalytics = async () => {

     try {

        const res = await api.get("/analytics");

        setStatusStats(res.data.statusStats);
        setDepartmentStats(res.data.departmentStats);

     } catch (error) {

        console.log(error);

     }

    };

    loadAnalytics();

 }, []);

 return (

  <div className="p-10 space-y-8">

   <h1 className="text-2xl font-bold">
    Complaint Analytics
   </h1>

   {/* Status Chart */}

   <Card className="p-6">

    <h2 className="mb-4 font-semibold">
     Complaints by Status
    </h2>

    <ResponsiveContainer width="100%" height={300}>

     <BarChart data={statusStats}>

      <XAxis dataKey="_id" />

      <YAxis />

      <Tooltip />

      <Bar dataKey="count" />

     </BarChart>

    </ResponsiveContainer>

   </Card>

   {/* Department Chart */}

   <Card className="p-6">

    <h2 className="mb-4 font-semibold">
     Complaints by Department
    </h2>

    <ResponsiveContainer width="100%" height={300}>

     <BarChart data={departmentStats}>

      <XAxis dataKey="_id" />

      <YAxis />

      <Tooltip />

      <Bar dataKey="count" />

     </BarChart>

    </ResponsiveContainer>

   </Card>

  </div>

 );
}