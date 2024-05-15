import express from "express";
import Attendance from "../model/attendance";

const route = express.Router();
//get all marked attendace for a particular employee with a particular month
route.post("/getMarkedAttendance", async (req, res) => {
    const {employeeId, date}: {employeeId: string, date: Date} = req.body;
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()
    try{
        const attendance = await Attendance.find({employeeId});
        res.send(attendance.filter((attendance) => new Date(attendance.date).getMonth() === month && new Date(attendance.date).getFullYear() === year));
    }catch (err){
        res.status(500).json({ message: err });
    }
});

export default route;