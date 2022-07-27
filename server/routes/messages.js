const { addMessage, getMessages, getNotifications, updateNotification } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get('/notification/:userId', getNotifications) // Today Update - Add notification to the user
router.put('/notification/:notificationId', updateNotification) // Today Update - Update notification to the user

module.exports = router;
