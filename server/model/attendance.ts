import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendance = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    advance: {
        type: String,
        required: true
    },
    bonus: {
        type: String,
        required: true
    }
})

export default mongoose.model("attendance", attendance)