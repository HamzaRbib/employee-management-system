import express from "express";
import Employee from "../model/employee";

const router = express.Router();
router.get("/getAllEmployees", async (req, res) => {
    try{
        const employees = await Employee.find();
        console.log("Successfully got all employees yes")
        res.send(employees);
    }catch (err){
        console.log("Failed to get all employees")
        res.status(500).json({ message: err });
    }
});

export default router