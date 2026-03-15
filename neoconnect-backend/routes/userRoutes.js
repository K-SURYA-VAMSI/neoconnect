const express = require("express");
const router = express.Router();

const { getUsers, updateUserRole } = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, roleMiddleware("admin"), getUsers);
router.patch("/:id/role", authMiddleware, roleMiddleware("admin"), updateUserRole);

module.exports = router;
