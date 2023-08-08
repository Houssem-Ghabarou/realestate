const express = require("express");
const router = express.Router();

const {
  sendEmail,
  getReadEmails,
  markAsRead,
  getUnreadEmails,
  getEmails,
} = require("../controllers/email-controller");

const passport = require("../middlware/passport");
const jwtAdmin = passport.authenticate("ADMIN", {
  session: false,
});

router.post("/", sendEmail);
router.get("/",jwtAdmin, getEmails);
router.get("/read",jwtAdmin, getReadEmails);
router.get("/unread",jwtAdmin, getUnreadEmails);
router.put("/markasread",jwtAdmin, markAsRead);

module.exports = router;
