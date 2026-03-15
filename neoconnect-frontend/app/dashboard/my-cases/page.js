"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

import { Card } from "@/components/ui/card";
import {
 Table,
 TableHeader,
 TableRow,
 TableHead,
 TableBody,
 TableCell
} from "@/components/ui/table";

export default function MyCasesPage() {

 const [cases, setCases] = useState([]);

 const fetchCases = async () => {

  try {

   const res = await api.get("/complaints/my-cases");

   setCases(res.data);

  } catch (error) {

   console.log(error);

  }

 };

 useEffect(() => {

  const loadCases = async () => {

   try {

    const res = await api.get("/complaints/my-cases");

    setCases(res.data);

   } catch (error) {

    console.log(error);

   }

  };

  loadCases();

 }, []);

 const updateStatus = async (id, status) => {

  try {

   await api.patch(`/complaints/status/${id}`, {
    status
   });

   fetchCases();

  } catch (error) {

   console.log(error);

  }

 };

 return (

  <div className="p-10">

   <h1 className="text-2xl font-bold mb-6">
    My Assigned Cases
   </h1>

   <Card className="p-4">

    <Table>

     <TableHeader>
      <TableRow>
       <TableHead>Tracking ID</TableHead>
       <TableHead>Title</TableHead>
       <TableHead>Status</TableHead>
       <TableHead>Update</TableHead>
      </TableRow>
     </TableHeader>

     <TableBody>

      {cases?.map((c) => (

       <TableRow key={c._id}>

        <TableCell>{c.trackingId}</TableCell>

        <TableCell>{c.title}</TableCell>

        <TableCell>{c.status}</TableCell>

        <TableCell>

         <select
          onChange={(e) =>
           updateStatus(c._id, e.target.value)
          }
          className="border p-1 rounded"
         >

          <option value="">Update</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>

         </select>

        </TableCell>

       </TableRow>

      ))}

     </TableBody>

    </Table>

   </Card>

  </div>

 );

}