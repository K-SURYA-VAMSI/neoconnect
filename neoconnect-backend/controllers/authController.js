const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};



exports.login = async (req, res) => {

 try {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
   return res.status(400).json({
    message: "Invalid email or password"
   });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
   return res.status(400).json({
    message: "Invalid email or password"
   });
  }

  const token = jwt.sign(
   {
    id: user._id,
    role: user.role
   },
   process.env.JWT_SECRET,
   { expiresIn: "7d" }
  );

  res.cookie("token", token, {
   httpOnly: true,
   secure: false,
   maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
   message: "Login successful",
   user: {
    id: user._id,
    name: user.name,
    role: user.role
   }
  });

 } catch (error) {

  res.status(500).json({
   message: "Server error"
  });

 }

};

exports.logout = (req, res) => {

 res.clearCookie("token");

 res.json({
  message: "Logged out successfully"
 });

};

exports.getCaseManagers = async (req, res) => {

 try {

  const users = await User.find({
   role: "case_manager"
  }).select("_id name email");

  res.json(users);

 } catch (error) {

  res.status(500).json({
   message: "Server error"
  });

 }

};

exports.getCurrentUser = async (req, res) => {

 try {

  const user = await User.findById(req.user.id)
   .select("name email role");

  res.json(user);

 } catch (error) {

  res.status(500).json({
   message: "Server error"
  });

 }

};