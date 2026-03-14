const Complaint = require("../models/Complaint");
const generateTrackingId = require("../utils/generateTrackingId");

exports.createComplaint = async (req, res) => {

 try {

    console.log("USER:", req.user);


  const {
   title,
   description,
   category,
   department,
   location,
   severity,
   anonymous
  } = req.body;

  const trackingId = await generateTrackingId();

  const complaint = await Complaint.create({

   trackingId,
   title,
   description,
   category,
   department,
   location,
   severity,
   anonymous,
   fileUrl: req.file ? req.file.path : null,
   createdBy: req.user.id

  });
   

  res.status(201).json({
   message: "Complaint submitted successfully",
   complaint
  });

 } catch (error) {

  res.status(500).json({
   message: error.message
  });

 }

};

exports.getAllComplaints = async (req, res) => {

 try {

  const complaints = await Complaint
   .find()
   .populate("createdBy", "name email")
   .populate("assignedTo", "name email");

  res.json(complaints);

 } catch (error) {

  console.error(error);

  res.status(500).json({
   message: "Server error"
  });

 }

};

exports.assignComplaint = async (req, res) => {

 try {

  const { caseManagerId } = req.body;

  const complaint = await Complaint.findByIdAndUpdate(

   req.params.id,

   {
    assignedTo: caseManagerId,
    status: "Assigned"
   },

   { new: true }

  );

  res.json({
   message: "Complaint assigned successfully",
   complaint
  });

 } catch (error) {

  console.error(error);

  res.status(500).json({
   message: "Server error"
  });

 }

};

exports.getAssignedComplaints = async (req, res) => {

 try {

  const complaints = await Complaint.find({
   assignedTo: req.user.id
  });

  res.json(complaints);

 } catch (error) {

  res.status(500).json({
   message: "Server error"
  });

 }

};

exports.updateComplaintStatus = async (req, res) => {

 try {

  const { status } = req.body;

  const complaint = await Complaint.findByIdAndUpdate(

   req.params.id,

   {
    status,
    lastUpdated: Date.now()
   },

   { new: true }

  );

  res.json({
   message: "Status updated",
   complaint
  });

 } catch (error) {

  res.status(500).json({
   message: "Server error"
  });

 }

};