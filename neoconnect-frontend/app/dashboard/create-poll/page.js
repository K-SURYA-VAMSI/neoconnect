"use client";

import { useState } from "react";
import api from "../../../services/api";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreatePollPage() {

 const [question, setQuestion] = useState("");
 const [options, setOptions] = useState(["", ""]);

 const handleOptionChange = (index, value) => {
  const newOptions = [...options];
  newOptions[index] = value;
  setOptions(newOptions);
 };

 const addOption = () => {
  setOptions([...options, ""]);
 };

 const createPoll = async () => {

  try {

   await api.post("/polls", {
    question,
    options
   });

   alert("Poll created successfully");

   setQuestion("");
   setOptions(["", ""]);

  } catch (error) {

   console.log(error);
   alert("Error creating poll");

  }

 };

 return (

  <div className="p-10">

   <h1 className="text-2xl font-bold mb-6">
    Create Poll
   </h1>

   <Card className="p-6 space-y-4">

    <Input
     placeholder="Poll Question"
     value={question}
     onChange={(e) => setQuestion(e.target.value)}
    />

    {options.map((option, index) => (

     <Input
      key={index}
      placeholder={`Option ${index + 1}`}
      value={option}
      onChange={(e) =>
       handleOptionChange(index, e.target.value)
      }
     />

    ))}

    <Button variant="outline" onClick={addOption}>
     Add Option
    </Button>

    <Button onClick={createPoll}>
     Create Poll
    </Button>

   </Card>

  </div>

 );
}