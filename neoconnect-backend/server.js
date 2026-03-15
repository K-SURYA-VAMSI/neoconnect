const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();

connectDB();

require("./jobs/escalationJob");

const app = express();

const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "")
 .split(",")
 .map((origin) => origin.trim())
 .filter(Boolean);

const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS === "true";

app.use(
 cors({
  origin: (origin, callback) => {
   if (!origin) {
    return callback(null, true);
   }

   if (allowedOrigins.includes(origin)) {
    return callback(null, true);
   }

   if (allowVercelPreviews) {
    try {
     const { hostname } = new URL(origin);

     if (hostname.endsWith(".vercel.app")) {
      return callback(null, true);
     }
    } catch (error) {
     return callback(new Error("Invalid CORS origin"));
    }
   }

   return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
 })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/polls", require("./routes/pollRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/minutes", require("./routes/minuteRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});