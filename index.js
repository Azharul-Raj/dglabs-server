const express = require("express");
const cors = require("cors");
// const { connectDB } = require("./connectDB.js");
const { users } = require("./db.config.js");
const { ObjectId } = require("mongodb");
const { connectDB } = require("./db.config.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;
app.listen(port, () => {
  console.log(`server is running`);
});
connectDB();

app.post("/add_user", async (req, res) => {
  const data = req.body;
  try {
    const isExist = await users.findOne({ email: data.email });
    if (isExist) {
      res.json({
        status: "fail",
        data: null,
        message: "user exist with this email",
      });
      return;
    }
    const user = await users.insertOne(data);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
});
// get user
app.get("/get_user/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await users.findOne({email });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
});

//put request
app.put("/update_info/:email",async(req,res)=>{
  const {email}=req.params;
  const {url,btnTitle}=req.body;
  try {
    const filter={email};
    const updatedDoc={
      $set:{
        logo:url,
        btnTitle
      }
    }
    const updatedUser=await users.findOneAndUpdate(filter,updatedDoc,{upsert:true});
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
})
///get users
app.get("/users", async (req, res) => {
  try {
    const allUser = await users.find({}).toArray();
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
  }
});
