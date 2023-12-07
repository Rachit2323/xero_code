const express = require("express");
const mongoose = require("mongoose");



const app = express();
const userRoutes = require("./routes/user.js");
// const postRoutes = require("./routes/post.js");
const cors = require("cors");

app.use(express.json());

app.use(cors());


app.use("/users", userRoutes);
// app.use("/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello, I am here and running!");
});

mongoose
  .connect("mongodb://localhost:27017/zerocode", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});