"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function ComplaintsDashboard() {

 const [complaints, setComplaints] = useState([]);
 const [caseManagers, setCaseManagers] = useState([]);

 const fetchComplaints = async () => {

  try {

   const res = await api.get("/complaints");
       console.log(res.data);   


   setComplaints(res.data);

  } catch (error) {

 if(error.response?.status === 403){
   alert("Access denied. Only Secretariat can view complaints.");
 }

}

 };

const fetchManagers = async () => {

 try {

  const res = await api.get("/auth/case-managers");

  setCaseManagers(res.data);

 } catch (error) {

  console.log(error);

 }

};

 useEffect(() => {

  const loadInitialData = async () => {

   try {

    const [complaintsRes, managersRes] = await Promise.all([
     api.get("/complaints"),
     api.get("/auth/case-managers")
    ]);

    setComplaints(complaintsRes.data);
    setCaseManagers(managersRes.data);

   } catch (error) {

    if (error.response?.status === 403) {
     alert("Access denied. Only Secretariat can view complaints.");
    }

   }

  };

  loadInitialData();

 }, []);

const assignManager = async (complaintId, managerId) => {

 try {

  await api.patch(`/complaints/assign/${complaintId}`, {
   caseManagerId: managerId
  });

  alert("Manager assigned");

  fetchComplaints();

 } catch (error) {

  console.log(error);

 }

};

 return (

  <div className="p-10">

   <h1 className="text-2xl font-bold mb-6">
    Complaint Management
   </h1>

   <Card className="p-4">

    <Table>

     <TableHeader>
      <TableRow>
       <TableHead>Tracking ID</TableHead>
       <TableHead>Title</TableHead>
       <TableHead>Department</TableHead>
       <TableHead>Status</TableHead>
       <TableHead>Assign</TableHead>
      </TableRow>
     </TableHeader>

     <TableBody>

      {complaints.map((c) => (

       <TableRow key={c._id}>

        <TableCell>{c.trackingId}</TableCell>
        <TableCell>{c.title}</TableCell>
        <TableCell>{c.department}</TableCell>
        <TableCell>{c.status}</TableCell>

        <TableCell>

 <select
  onChange={(e) =>
   assignManager(c._id, e.target.value)
  }
  className="border p-1 rounded"
 >

  <option value="">Assign</option>

  {caseManagers.map((m) => (

   <option key={m._id} value={m._id}>
    {m.name}
   </option>

  ))}

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