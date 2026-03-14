const express = require("express");
const router = express.Router();

const { getAnalytics } = require("../controllers/analyticsController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
 "/",
 authMiddleware,
 roleMiddleware("secretariat", "admin"),
 getAnalytics
);

module.exports = router;