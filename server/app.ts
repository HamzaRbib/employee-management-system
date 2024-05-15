import { Express } from "express";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import  addEmployeeRouter from "./routes/addEmployee";
import  getAllEmployeesRouter from "./routes/getAllEmployees";
import deleteEmployee from "./routes/deleteEmployee";
import editEmployee from "./routes/editEmployee";
import markAttendance from "./routes/markAttendance";
import getMarkedAttendance from "./routes/getMarkedAttendance";

const url: string = "mongodb://localhost:27017/employeeManagement";

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(url);
const con = mongoose.connection;
con.on("open", () => {
  console.log("connected...");
});

app.get("/", (req, res) => {
  res.send("wellcome to the employee management app");
});

app.use("/", addEmployeeRouter);
app.use("/", getAllEmployeesRouter);
app.use("/", deleteEmployee);
app.use("/", editEmployee);
app.use("/", markAttendance);
app.use("/", getMarkedAttendance);

app.listen(5000, () => console.log("Server started on port 5000"));