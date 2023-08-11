require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use((req, res) => {
  res.status(404).send("Sorry, we couldn't find what you're looking for.");
});

app.use((err, req, res) => {
  console.error("An error occurred:", err.stack);
  res.status(500).send("Error Occured");
});

const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Server is running on port ${port}`));
