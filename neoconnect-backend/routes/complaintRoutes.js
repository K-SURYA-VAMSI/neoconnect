const express = require("express");
const router = express.Router();

const { createComplaint, getAllComplaints, assignComplaint, getAssignedComplaints, updateComplaintStatus } = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
 "/submit",
 authMiddleware,
 roleMiddleware("staff"),
 upload.single("file"),
 createComplaint
);

router.get(
 "/",
 authMiddleware,
  roleMiddleware("secretariat"),
 getAllComplaints
);


router.patch(
 "/assign/:id",
 authMiddleware,
  roleMiddleware("secretariat"),
 assignComplaint
);

router.get(
 "/my-cases",
 authMiddleware,
  roleMiddleware("case_manager"),
 getAssignedComplaints
);

router.patch(
 "/status/:id",
 authMiddleware,
  roleMiddleware("case_manager"),
 updateComplaintStatus
);

module.exports = router;