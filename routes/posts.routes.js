let express = require("express");
const { PostModel } = require("../models/posts.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
var jwt = require("jsonwebtoken");
let postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    let query = res.query;
    let posts = await PostModel.find(query);
    res.send(posts);
  } catch (error) {
    res.send(error.message);
  }
  res.send(PostModel.find());
});

postRouter.post("/", async (req, res) => {
  let payload = req.body;
  try {
    let post = new PostModel(payload);
    await post.save();
    res.send("Post has been added");
  } catch (error) {
    res.send(error.message);
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let postId = req.params.id;

  let post = await PostModel.findOne({ _id: postId });
  let user_id_in_posts = post.userId;
  let user_id_req = req.body.userId;
  try {
    if (user_id_req !== user_id_in_posts) {
      res.send("You are not authorized");
    } else {
      await PostModel.findByIdAndUpdate({ _id: postId }, payload);

      res.send("Post has been updated");
    }
  } catch (error) {
    res.send(error.message);
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  let postId = req.params.id;

  let post = await PostModel.findOne({ _id: postId });
  let user_id_in_posts = post.userId;
  let user_id_req = req.body.userId;
  try {
    if (user_id_req !== user_id_in_posts) {
      res.send("You are not authorized");
    } else {
      await PostModel.findByIdAndUpdate({ _id: postId });

      res.send("Post has been deleted");
    }
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = { postRouter };
