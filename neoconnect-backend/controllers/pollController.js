const Poll = require("../models/Poll");

exports.createPoll = async (req, res) => {

 try {

  const { question, options } = req.body;

  const poll = await Poll.create({
   question,
   options: options.map(option => ({ text: option })),
   createdBy: req.user.id
  });

  res.status(201).json({
   message: "Poll created successfully",
   poll
  });

 } catch (error) {

  console.error(error);

  res.status(500).json({
   message: "Server error"
  });

 }

};

exports.getPolls = async (req, res) => {

 try {

  const polls = await Poll.find();

  res.json(polls);

 } catch (error) {

  res.status(500).json({
   message: "Server error"
  });

 }

};

exports.votePoll = async (req, res) => {

 try {

  const { optionIndex } = req.body;

  const poll = await Poll.findById(req.params.id);

  if (!poll) {
   return res.status(404).json({
    message: "Poll not found"
   });
  }

  if (poll.voters.includes(req.user.id)) {
   return res.status(400).json({
    message: "You already voted"
   });
  }

  poll.options[optionIndex].votes += 1;

  poll.voters.push(req.user.id);

  await poll.save();

  res.json({
   message: "Vote recorded",
   poll
  });

 } catch (error) {

  res.status(500).json({
   message: "Server error"
  });

 }

};