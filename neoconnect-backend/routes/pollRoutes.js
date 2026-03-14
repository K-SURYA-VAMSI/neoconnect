const express = require("express");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");

const {
 createPoll,
 getPolls,
 votePoll
} = require("../controllers/pollController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware,  roleMiddleware("secretariat"), createPoll);

router.get("/", authMiddleware,  roleMiddleware("staff"), getPolls);

router.post("/vote/:id", authMiddleware,  roleMiddleware("staff"), votePoll);

module.exports = router;