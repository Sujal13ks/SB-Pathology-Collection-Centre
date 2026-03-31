import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // 🔥 IMPORTANT
      required: true,
    },
    tests: [
      {
        name: String,
        price: Number,
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Bill ||
  mongoose.model("Bill", BillSchema);



