const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};


// Today Update - Add notification to the user

module.exports.getNotifications = async (req, res, next) => {
  const { userId } = req.params;
  // console.log("userId", userId);
  const notifications = await Messages.find({
    to: userId,
    isSeen: false,
  });
  // console.log("notifications", notifications);
  return res.send({
    success: true,
    message: "Notifications fetched successfully",
    data: notifications.length,
  })
}

module.exports.updateNotification = async (req, res, next) => {
  const { notificationId } = req.params;
  const payload = req.body;

  const notification = await Messages.find({ _id: notificationId });
  console.log("notification", notification);

  if (!notification) {
    return res.status(400).send({
      success: false,
      message: "Notification not found"
    });
  }

  const updatedNotification = await Messages.findOneAndUpdate({
    _id: notificationId,
  }, payload, { new: true });

  return res.send({
    success: true,
    message: 'Notification updated',
    data: updatedNotification,
  });

}