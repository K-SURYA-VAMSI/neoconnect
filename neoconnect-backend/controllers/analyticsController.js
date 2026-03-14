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

