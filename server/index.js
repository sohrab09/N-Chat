const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());
const PORT = 5001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get('/', (req, res) => {
  res.send(`
  <h1>N Chat</h1>
  <h2>Nassa Group Internal Chat Application</h2>
  `);
})


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT || PORT, () =>
  console.log(`Server Running On Port ${PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", //local host
    // origin: "http://172.16.10.125:81", //server host
    credentials: false,
    methods: ["GET", "POST"],
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", async (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log("sendUserSocket", sendUserSocket); // when both user are online then it will show socket id //!today added
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receive-msg", data.msg);
    }
  });
});
