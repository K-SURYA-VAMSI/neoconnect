"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Card } from "@/components/ui/card";

export default function UsersPage(){

 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [errorMessage, setErrorMessage] = useState("");

 const fetchUsers = async () => {

    try {

     const res = await api.get("/users");

     setUsers(res.data);
     setErrorMessage("");

    } catch (error) {

     if (error.response?.status === 403) {
        setErrorMessage("Only admin can access user management.");
     } else {
        setErrorMessage("Failed to load users.");
     }

    } finally {
     setLoading(false);
    }

 };

 useEffect(() => {
    fetchUsers();
 }, []);

 const updateRole = async (id, role) => {

    try {

     await api.patch(`/users/${id}/role`, { role });

     fetchUsers();

    } catch (error) {
     alert("Failed to update role");
    }

 };

 if (loading) {
    return <div className="p-10">Loading users...</div>;
 }

 return (

    <div className="p-10 space-y-4">

   <h1 className="text-2xl font-bold mb-6">
    User Management
   </h1>

     {errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
     )}

     {users.map((u) => (

        <Card key={u._id} className="p-4 flex justify-between items-center">

         <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-gray-600">{u.email}</p>
         </div>

         <div className="flex items-center gap-2">

            <select
             defaultValue={u.role}
             onChange={(e) => updateRole(u._id, e.target.value)}
             className="border rounded p-2 text-sm"
            >
             <option value="staff">staff</option>
             <option value="secretariat">secretariat</option>
             <option value="case_manager">case_manager</option>
             <option value="admin">admin</option>
            </select>

         </div>

        </Card>

     ))}

  </div>

 );

}