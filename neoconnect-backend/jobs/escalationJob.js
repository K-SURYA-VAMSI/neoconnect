const cron = require("node-cron");
const Complaint = require("../models/Complaint");

cron.schedule("0 0 * * *", async () => {

 console.log("Running escalation check...");

 const sevenDaysAgo = new Date();

 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

 try {

  const result = await Complaint.updateMany(

   {
    status: { $ne: "Resolved" },
    lastUpdated: { $lt: sevenDaysAgo }
   },

   {
    status: "Escalated"
   }

  );

  console.log("Escalated complaints:", result.modifiedCount);

 } catch (error) {

  console.error("Escalation job error:", error);

 }

});