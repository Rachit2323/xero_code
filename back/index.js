const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/user.js");
// const postRoutes = require("./routes/post.js");
const URI =
  "mongodb+srv://Rachit23:UhP8Iiyp4xxptvmM@cluster0.fgnb20h.mongodb.net/zero";
// const URI="mongodb://localhost:27017/zerocode";

app.use(express.json());

// app.use(cors({ credentials: true ,
// }));

const allowedOrigins = ["http://localhost:3000","https://xero-code-jet.vercel.app"];
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/users", userRoutes);
// app.use("/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello, I am here and running!");
});

mongoose
  .connect(URI, {
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
