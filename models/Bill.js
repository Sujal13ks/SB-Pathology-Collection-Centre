import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        tests: [
            {
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        total: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Bill ||
    mongoose.model("Bill", BillSchema);



