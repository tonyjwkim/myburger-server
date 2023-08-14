require("dotenv").config();
require("./configs/firebaseAdmin.js");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoutes = require("./routes/loginRoutes");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
app.use(express.json());

app.use(cors());

app.use("/users", loginRoutes);

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res) => {
  console.error("An error occurred:", err.stack);
  res.status(500).send("Error Occured");
});

const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Server is running on port ${port}`));
