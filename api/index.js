import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/Biswa-Estate")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.listen(3000, () => {
  console.log("server is running on port 3000 ");
});

app.use("/api/user", userRouter);
