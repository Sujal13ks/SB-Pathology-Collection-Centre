import connectDB from "@/db/connectdb";
import Bill from "@/models/Bill";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        if (!body.patientId || !mongoose.Types.ObjectId.isValid(body.patientId)) {
            return NextResponse.json(
                { message: "Invalid patientId" },
                { status: 400 }
            );
        }

        if (!Array.isArray(body.tests) || body.tests.length === 0) {
            return NextResponse.json(
                { message: "Tests are required" },
                { status: 400 }
            );
        }

        const total = body.tests.reduce(
            (sum, t) => sum + Number(t.price || 0),
            0
        );

        const bill = await Bill.create({
            patientId: body.patientId,
            tests: body.tests,
            total,
        });

        return NextResponse.json(
            { success: true, bill },
            { status: 201 }
        );

    } catch (error) {
        console.error("POST ERROR:", error);
        return NextResponse.json(
            { message: "Server Error", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const bills = await Bill.find()
            .populate("patientId")
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, bills });

    } catch (error) {
        console.error("GET ERROR:", error);
        return NextResponse.json(
            { message: "Server Error", error: error.message },
            { status: 500 }
        );
    }
}
