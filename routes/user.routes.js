let express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
var jwt = require("jsonwebtoken");
let userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  let { name, email, password, gender, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send("Something is wrong");
      } else {
        let user = new UserModel({
          name,
          email,
          password: hash,
          gender,
          age,
          city,
        });
        await user.save();
        res.send("User has been registered");
      }
    });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign({ course: "backend" }, process.env.key);
          res.send({ masg: "Login successfull", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = { userRouter };
