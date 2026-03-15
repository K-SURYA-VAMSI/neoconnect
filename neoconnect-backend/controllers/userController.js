const User = require("../models/User");

exports.getUsers = async (req, res) => {
 try {
  const users = await User.find()
   .select("name email role department createdAt")
   .sort({ createdAt: -1 });

  res.json(users);
 } catch (error) {
  res.status(500).json({
   message: "Server error"
  });
 }
};

exports.updateUserRole = async (req, res) => {
 try {
  const { role } = req.body;

  const allowedRoles = ["staff", "secretariat", "case_manager", "admin"];

  if (!allowedRoles.includes(role)) {
   return res.status(400).json({
    message: "Invalid role"
   });
  }

  const user = await User.findByIdAndUpdate(
   req.params.id,
   { role },
   { new: true }
  ).select("name email role department createdAt");

  if (!user) {
   return res.status(404).json({
    message: "User not found"
   });
  }

  res.json({
   message: "User role updated",
   user
  });
 } catch (error) {
  res.status(500).json({
   message: "Server error"
  });
 }
};
