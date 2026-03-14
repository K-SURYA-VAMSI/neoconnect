const Complaint = require("../models/Complaint");

const generateTrackingId = async () => {

 const year = new Date().getFullYear();

 const count = await Complaint.countDocuments();

 const number = String(count + 1).padStart(3, "0");

 return `NEO-${year}-${number}`;
};

module.exports = generateTrackingId;