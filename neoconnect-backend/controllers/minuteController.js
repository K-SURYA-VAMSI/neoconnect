const Minute = require("../models/Minute");

exports.createMinute = async (req, res) => {
 try {
  const { title } = req.body;

  if (!title || !req.file) {
   return res.status(400).json({
    message: "Title and PDF file are required"
   });
  }

  const minute = await Minute.create({
   title,
   fileUrl: req.file.path,
   uploadedBy: req.user.id
  });

  res.status(201).json({
   message: "Minutes uploaded successfully",
   minute
  });
 } catch (error) {
  res.status(500).json({
   message: "Server error"
  });
 }
};

exports.getMinutes = async (req, res) => {
 try {
  const search = req.query.search?.trim();

  const filter = search
   ? { title: { $regex: search, $options: "i" } }
   : {};

  const minutes = await Minute.find(filter)
   .populate("uploadedBy", "name role")
   .sort({ createdAt: -1 });

  res.json(minutes);
 } catch (error) {
  res.status(500).json({
   message: "Server error"
  });
 }
};
