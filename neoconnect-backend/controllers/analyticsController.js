const Complaint = require("../models/Complaint");

exports.getAnalytics = async (req, res) => {

 try {

  // complaints by status
  const statusStats = await Complaint.aggregate([
   {
    $group: {
     _id: "$status",
     count: { $sum: 1 }
    }
   }
  ]);

  // complaints by department
  const departmentStats = await Complaint.aggregate([
   {
    $group: {
     _id: "$department",
     count: { $sum: 1 }
    }
   }
  ]);

  // complaints by category
  const categoryStats = await Complaint.aggregate([
   {
    $group: {
     _id: "$category",
     count: { $sum: 1 }
    }
   }
  ]);
// hotspot detection

const hotspots = await Complaint.aggregate([

 {
  $group: {
   _id: {
    department: "$department",
    category: "$category"
   },
   count: { $sum: 1 }
  }
 },

 {
  $match: {
   count: { $gte: 5 }
  }
 }

]);
  res.json({
   statusStats,
   departmentStats,
   categoryStats,
   hotspots
  });

 } catch (error) {

  console.error(error);

  res.status(500).json({
   message: "Server error"
  });

 }

};

exports.getPublicHubImpact = async (req, res) => {

 try {

  const now = new Date();
  const ninetyDaysAgo = new Date(now);
  ninetyDaysAgo.setDate(now.getDate() - 90);

  const [
   totalResolved,
   resolvedLast90Days,
   openEscalated,
   topImpactAreas,
   recentResolutions
  ] = await Promise.all([
   Complaint.countDocuments({ status: "Resolved" }),
   Complaint.countDocuments({
    status: "Resolved",
    updatedAt: { $gte: ninetyDaysAgo }
   }),
   Complaint.countDocuments({ status: "Escalated" }),
   Complaint.aggregate([
    {
     $match: { status: "Resolved" }
    },
    {
     $group: {
      _id: {
       department: "$department",
       category: "$category"
      },
      resolvedCount: { $sum: 1 }
     }
    },
    {
     $sort: { resolvedCount: -1 }
    },
    {
     $limit: 5
    }
   ]),
   Complaint.find({ status: "Resolved" })
    .select("trackingId title category department updatedAt")
    .sort({ updatedAt: -1 })
    .limit(10)
  ]);

  res.json({
   summary: {
    totalResolved,
    resolvedLast90Days,
    openEscalated
   },
   topImpactAreas,
   recentResolutions
  });

 } catch (error) {

  console.error(error);

  res.status(500).json({
   message: "Server error"
  });

 }

};

