import connectDB from "@/db/connectdb";
import Patient from "@/models/Patient";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const patient = await Patient.create(body);

        return Response.json({ patient }, { status: 201 });
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}


