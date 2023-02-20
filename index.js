let express = require("express");
require("dotenv").config();
let cors = require("cors");
let { connection } = require("./config/db");
let { authenticate } = require("./middleware/auth.midleware");
let { postRouter } = require("./routes/posts.routes");
let { userRouter } = require("./routes/user.routes");
let app = express();
app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Linkedin");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);
app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log("error.message");
  }
  console.log(`Server is running on port ${process.env.port}`);
});
