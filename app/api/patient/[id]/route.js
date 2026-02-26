import connectDB from "@/db/connectdb";
import Patient from "@/models/Patient";
import mongoose from "mongoose";

export async function GET(request, { params }) {
    try {
        await connectDB();

        
        const { id } = await params;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json(
                { message: "Invalid patient ID" },
                { status: 400 }
            );
        }

        const patient = await Patient.findById(id);

        if (!patient) {
            return Response.json(
                { message: "Patient not found" },
                { status: 404 }
            );
        }

        return Response.json({ patient }, { status: 200 });

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
