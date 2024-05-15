import express from "express";
import Employee from "../model/employee";

const router = express.Router();
router.post("/addEmployee", async (req, res) => {
  console.log("hello")
  try {
    const {
      employeeId,
      employeeName,
      designation,
      joiningDate,
      dateOfBirth,
      salary,
      isActive,
      phoneNumber,
      country,
    } = req.body;
    const newEmployee = new Employee({
      employeeId,
      employeeName,
      designation,
      joiningDate,
      dateOfBirth,
      salary,
      isActive,
      phoneNumber,
      country,
    });
    await newEmployee.save();
    res.send({ message: "Employee added successfully" });
    console.log("Employee added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

export default router