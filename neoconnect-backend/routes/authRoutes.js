const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
 register,
 login,
 logout,
 getCaseManagers,
 getCurrentUser
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get(
 "/case-managers",
 authMiddleware,
 roleMiddleware("secretariat", "admin"),
 getCaseManagers
);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;