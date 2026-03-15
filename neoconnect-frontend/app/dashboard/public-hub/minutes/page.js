"use client";

import { useEffect, useState } from "react";
import api from "../../../../services/api";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MinutesPage() {

 const [title, setTitle] = useState("");
 const [file, setFile] = useState(null);
 const [search, setSearch] = useState("");
 const [minutes, setMinutes] = useState([]);

 const fetchMinutes = async (searchValue = "") => {

    try {

     const res = await api.get("/minutes", {
        params: {
         search: searchValue
        }
     });

     setMinutes(res.data);

    } catch (error) {

     console.log(error);

    }

 };

 useEffect(() => {

  const loadMinutes = async () => {

  try {

   const res = await api.get("/minutes");

   setMinutes(res.data);

  } catch (error) {

   console.log(error);

  }

  };

  loadMinutes();

 }, []);

 const uploadMinutes = async () => {

    if (!title || !file) {
     alert("Please add title and file");
     return;
    }

  const formData = new FormData();

  formData.append("title", title);
  formData.append("file", file);

  try {

   await api.post("/minutes", formData);

   alert("Minutes uploaded");

   setTitle("");
   setFile(null);
    fetchMinutes(search);

  } catch (error) {

   console.log(error);

  }

 };

 const handleSearch = async () => {
  fetchMinutes(search);
 };

 const getFileLink = (fileUrl) => {
  const normalizedPath = fileUrl.replaceAll("\\", "/");
  return `http://localhost:5000/${normalizedPath}`;
 };

 return (

  <div className="p-10 space-y-6">

   <h1 className="text-2xl font-bold mb-6">
    Minutes Archive
   </h1>

   <Card className="p-6 space-y-4">

    <Input
     placeholder="Meeting Title"
     value={title}
     onChange={(e) => setTitle(e.target.value)}
    />

    <input
     type="file"
     onChange={(e) => setFile(e.target.files[0])}
    />

    <Button onClick={uploadMinutes}>
     Upload Minutes
    </Button>

   </Card>

    <Card className="p-6 space-y-4">

     <h2 className="text-lg font-semibold">Search Minutes</h2>

     <div className="flex gap-2">

      <Input
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button onClick={handleSearch}>Search</Button>

     </div>

     <div className="space-y-2">

      {minutes.length === 0 && (
        <p className="text-sm text-gray-600">No minutes found.</p>
      )}

      {minutes.map((item) => (

        <div key={item._id} className="border rounded p-3 flex justify-between items-center">

         <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-gray-500">
            Uploaded by {item.uploadedBy?.name || "Unknown"}
          </p>
         </div>

         <a
          href={getFileLink(item.fileUrl)}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 text-sm underline"
         >
          Open PDF
         </a>

        </div>

      ))}

     </div>

    </Card>

  </div>

 );
}