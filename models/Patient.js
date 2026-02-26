import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },
        doctorName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Patient ||
    mongoose.model("Patient", PatientSchema);
