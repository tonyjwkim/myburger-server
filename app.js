require("dotenv").config();
require("./configs/firebaseAdmin.js");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { addClient, removeClient } = require("./eventBroadcaster");
const loginRoutes = require("./routes/loginRoutes");
const folderRoutes = require("./routes/folderRoutes");

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
const corsOptions = {
  origin: function (_origin, callback) {
    callback(null, true);
  },
  methods: "GET,POST,DELETE",
};

app.use(cors(corsOptions));

app.use("/users", loginRoutes);
app.use("/users", folderRoutes);

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  addClient(res);

  req.on("close", () => {
    removeClient(res);
  });
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res) => {
  console.error("An error occurred:", err.stack);
  res.status(500).send("Error Occured");
});

const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Server is running on port ${port}`));
