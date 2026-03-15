const express = require("express");
const router = express.Router();

const { createMinute, getMinutes } = require("../controllers/minuteController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.post(
 "/",
 authMiddleware,
 roleMiddleware("secretariat", "admin"),
 upload.single("file"),
 createMinute
);

router.get("/", authMiddleware, getMinutes);

module.exports = router;
