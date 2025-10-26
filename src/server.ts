import express from "express";
import connectDB from "./config/database";
import Router from "@/routes";

const app = express();

//Enable json parsing body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1", Router);

app.listen(6000, () => {
  console.log("Sever is running on port 6000");
});
