import connectDB from "@/db/connectdb";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name || !body.age || !body.gender || !body.doctorName) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const patient = await Patient.create({
      name: body.name.trim(),
      age: Number(body.age),
      gender: body.gender,
      doctorName: body.doctorName.trim(),
      address: body.address || "",
    });

    return NextResponse.json(
      { success: true, patient },
      { status: 201 }
    );
  } catch (error) {
    console.log("PATIENT ERROR:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


  // import connectDB from "@/db/connectdb";
// import Patient from "@/models/Patient";

// export async function POST(req) {
//     try {
//         await connectDB();
//         const body = await req.json();

//         const patient = await Patient.create(body);

//         return Response.json({ patient }, { status: 201 });
//     } catch (error) {
//         return Response.json(
//             { message: error.message },
//             { status: 500 }
//         );
//     }
// }


