import express from "express";
import Employee from "../model/employee";

const route = express.Router();
route.put("/editEmployee/:id", async (req, res) => {
    const id = req.params.id;
    try{
        await Employee.findOneAndUpdate({employeeId: id}, req.body);
        res.send({ message: "Employee updated successfully" });
    }catch (err){
        res.status(500).json({ message: err });
    }
});

export default route