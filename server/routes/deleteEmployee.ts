import express from "express";
import Employee from "../model/employee";

const route = express.Router();

route.delete("/deleteEmployee/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await Employee.findOneAndDelete(({employeeId: id}));
        res.send({ message: "Employee deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
})

export default route