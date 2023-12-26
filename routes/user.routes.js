const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password, permissions,number,role } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).send({ message: "Please enter al the feilds" });
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      res.status(400).send("User already exists")
    }
    else {
      bcrypt.hash(password, 1, async (err, hash) => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          const user = new UserModel({ ...req.body, password: hash });
          await user.save();
          res.status(200).send({ message: `New User Has Been Registered` });
        }
      });
    }
  }
  catch (err) {
    res.status(400).send({ error: err.message })
  }
})

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email, please Signup first" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ userID: user._id }, "chatapp", { expiresIn: "12 hr" });
    res.status(200).send({
      message: "User logged in successfully",
      token,
      user
    });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong. Please try again later.",
    });
  }
});

userRouter.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.status(200).send({ message: "no users" });
    }

    res.status(200).send(users);

  } catch (error) {
    res.status(400).send({
      message: "Something went wrong. Please try again later.",
    });
  }
});

userRouter.patch("/updatePermission/:id",async(req,res)=>{
  const {id}=req.params;
  // console.log(id)
  try{
      await UserModel.findByIdAndUpdate({_id:id},req.body);
      res.send("data is updated")
  }catch(err){
      res.send({"err":err.message})
  }
})

userRouter.delete("/deleteMember/:id",async(req,res)=>{
  const {id}=req.params;
  // console.log(id)
  try{
      await UserModel.findByIdAndDelete({_id:id});
      res.send("member is deleted")
  }catch(err){
      res.send({"err":err.message})
  }
})

module.exports = { userRouter }