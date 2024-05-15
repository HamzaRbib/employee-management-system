import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employee = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    employeeName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    country: {
        type: {
            countryCode: String,
            countryName: String
        },
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("employee", employee)