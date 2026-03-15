"use client";

import { useState } from "react";
import api from "../../services/api";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ComplaintPage() {

 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [category, setCategory] = useState("");
 const [department, setDepartment] = useState("");
 const [location, setLocation] = useState("");
 const [severity, setSeverity] = useState("");
 const [anonymous, setAnonymous] = useState(false);
 const [file, setFile] = useState(null);

 const handleSubmit = async () => {

  try {

   const formData = new FormData();

   formData.append("title", title);
   formData.append("description", description);
   formData.append("category", category);
   formData.append("department", department);
   formData.append("location", location);
   formData.append("severity", severity);
   formData.append("anonymous", anonymous);

   if (file) {
    formData.append("file", file);
   }

   await api.post("/complaints/submit", formData);

   alert("Complaint submitted successfully");

   setTitle("");
   setDescription("");
   setDepartment("");
   setLocation("");
   setFile(null);

  } catch (error) {

   alert("Error submitting complaint");

  }

 };

 return (

  <div className="flex justify-center mt-10">

   <Card className="w-[600px] p-6 space-y-4">

    <h2 className="text-xl font-semibold">
     Submit Complaint
    </h2>

    <Input
     placeholder="Title"
     value={title}
     onChange={(e) => setTitle(e.target.value)}
    />

    <Textarea
     placeholder="Describe the issue..."
     value={description}
     onChange={(e) => setDescription(e.target.value)}
    />

    <Select onValueChange={setCategory}>
     <SelectTrigger>
      <SelectValue placeholder="Select Category" />
     </SelectTrigger>

     <SelectContent>
      <SelectItem value="Safety">Safety</SelectItem>
      <SelectItem value="Policy">Policy</SelectItem>
      <SelectItem value="Facilities">Facilities</SelectItem>
      <SelectItem value="HR">HR</SelectItem>
      <SelectItem value="Other">Other</SelectItem>
     </SelectContent>
    </Select>

    <Input
     placeholder="Department"
     value={department}
     onChange={(e) => setDepartment(e.target.value)}
    />

    <Input
     placeholder="Location"
     value={location}
     onChange={(e) => setLocation(e.target.value)}
    />

    <Select onValueChange={setSeverity}>
     <SelectTrigger>
      <SelectValue placeholder="Severity Level" />
     </SelectTrigger>

     <SelectContent>
      <SelectItem value="Low">Low</SelectItem>
      <SelectItem value="Medium">Medium</SelectItem>
      <SelectItem value="High">High</SelectItem>
     </SelectContent>
    </Select>

    <div className="flex items-center gap-2">

     <input
      type="checkbox"
      checked={anonymous}
      onChange={() => setAnonymous(!anonymous)}
     />

     <label>Submit anonymously</label>

    </div>

    <input
     type="file"
     onChange={(e) => setFile(e.target.files[0])}
    />

    <Button
     className="w-full"
     onClick={handleSubmit}
    >
     Submit Complaint
    </Button>

   </Card>

  </div>

 );

}