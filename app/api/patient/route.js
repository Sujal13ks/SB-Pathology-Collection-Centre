import connectDB from "@/db/connectdb";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ validation
    if (!body.name || !body.age || !body.gender || !body.doctorName) {
      return NextResponse.json(
        { message: "All required fields missing" },
        { status: 400 }
      );
    }

    // ✅ clean data
    const patientData = {
      name: body.name.trim(),
      age: Number(body.age),
      gender: body.gender,
      doctorName: body.doctorName.trim(),
      address: body.address?.trim() || "",
    };

    // ✅ check age
    if (isNaN(patientData.age)) {
      return NextResponse.json(
        { message: "Age must be number" },
        { status: 400 }
      );
    }

    console.log("Patient Data:", patientData);

    const patient = await Patient.create(patientData);

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


