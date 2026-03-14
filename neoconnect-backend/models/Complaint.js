const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

 trackingId: {
  type: String,
  unique: true
 },

 title: {
  type: String,
  required: true
 },

 description: {
  type: String,
  required: true
 },

 category: {
  type: String,
  enum: ["Safety", "Policy", "Facilities", "HR", "Other"],
  required: true
 },

 department: {
  type: String,
  required: true
 },

 location: {
  type: String
 },

 severity: {
  type: String,
  enum: ["Low", "Medium", "High"]
 },

 anonymous: {
  type: Boolean,
  default: false
 },

 fileUrl: {
  type: String
 },

 status: {
  type: String,
  enum: [
   "New",
   "Assigned",
   "In Progress",
   "Pending",
   "Resolved",
   "Escalated"
  ],
  default: "New"
 },

 lastUpdated: {
 type: Date,
 default: Date.now
},

 createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 },

 assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 }

 
  

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);