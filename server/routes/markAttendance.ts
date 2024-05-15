import express from "express";
import Attendace from "../model/attendance";

const route = express.Router();
route.post("/markAttendance", async (req, res) => {
    const {employeeId, date, status, advance, bonus} = req.body;
    // check if an attendace with the same employeeId and date already exists and udpdate it
    const attendance = await Attendace.findOne({employeeId, date});
    if(attendance){
        await Attendace.findOneAndUpdate({employeeId, date}, req.body);
        res.send({ message: "Attendance updated successfully" });
        return;
    }
    try{
        const newAttendance = new Attendace({
            employeeId,
            date,
            status,
            advance,
            bonus
        });
        await newAttendance.save();
        res.send({ message: "Attendance marked successfully" });
    }catch (err){
        res.status(500).json({ message: err });
    }
})

export default route;