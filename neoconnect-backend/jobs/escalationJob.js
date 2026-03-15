const cron = require("node-cron");
const Complaint = require("../models/Complaint");

/*
Function to calculate working days between two dates
Excludes Saturday (6) and Sunday (0)
*/
function workingDaysBetween(startDate, endDate) {

 let count = 0;
 let current = new Date(startDate);

 while (current <= endDate) {

  const day = current.getDay();

  if (day !== 0 && day !== 6) {
   count++;
  }

  current.setDate(current.getDate() + 1);

 }

 return count;

}


// Run every day at midnight
cron.schedule("0 0 * * *", async () => {

 console.log("Running escalation check...");

 try {

  const complaints = await Complaint.find({
   status: { $ne: "Resolved" }
  });

  let escalatedCount = 0;

  for (const c of complaints) {

   const days = workingDaysBetween(c.lastUpdated, new Date());

   if (days >= 7 && c.status !== "Escalated") {

    c.status = "Escalated";

    await c.save();

    escalatedCount++;

   }

  }

  console.log("Escalated complaints:", escalatedCount);

 } catch (error) {

  console.error("Escalation job error:", error);

 }

});