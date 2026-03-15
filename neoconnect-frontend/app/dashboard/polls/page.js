"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PollsPage() {

 const [polls, setPolls] = useState([]);

 const fetchPolls = async () => {

  try {

   const res = await api.get("/polls");

   setPolls(res.data);

  } catch (error) {

   console.log(error);

  }

 };

 useEffect(() => {

  const loadPolls = async () => {

   try {

    const res = await api.get("/polls");

    setPolls(res.data);

   } catch (error) {

    console.log(error);

   }

  };

  loadPolls();

 }, []);

 const vote = async (pollId, optionIndex) => {

  try {

   await api.post(`/polls/vote/${pollId}`, {
    optionIndex
   });

   alert("Vote submitted");

   fetchPolls();

  } catch (error) {

   alert("You already voted");

  }

 };

 return (

  <div className="p-10 space-y-6">

   <h1 className="text-2xl font-bold">
    Company Polls
   </h1>

   {polls.map((poll) => (

    <Card key={poll._id} className="p-6 space-y-4">

     <h2 className="font-semibold text-lg">
      {poll.question}
     </h2>

     {poll.options.map((option, index) => (

      <div
       key={index}
       className="flex justify-between items-center"
      >

       <span>
        {option.text} ({option.votes})
       </span>

       <Button
        onClick={() => vote(poll._id, index)}
       >
        Vote
       </Button>

      </div>

     ))}

    </Card>

   ))}

  </div>

 );
}