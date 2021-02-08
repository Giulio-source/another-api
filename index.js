require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");
const app = express();

//MIDDLEWARE
//TRIGGERED WHEN WE ARE URL/POSTS ONLY
app.use(express.json());
app.use("/posts", postsRoute);

//DB CONNECTION
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("Connected to the DB");
});

//PORT
app.listen(3000, () => {
  console.log("I am listening");
});
