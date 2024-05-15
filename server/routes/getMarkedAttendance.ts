import express from "express";
import Attendance from "../model/attendance";

const route = express.Router();
//get all marked attendace for a particular employee with a particular month
route.get("/getMarkedAttendance", async (req, res) => {
    const {employeeId, date}: {employeeId: string, date: Date} = req.body;
    const month = new Date(date).getMonth()
    try{
        const attendance = await Attendance.find({employeeId});
        res.send(attendance.filter((attendance) => new Date(attendance.date).getMonth() === month));
    }catch (err){
        res.status(500).json({ message: err });
    }
});

export default route;