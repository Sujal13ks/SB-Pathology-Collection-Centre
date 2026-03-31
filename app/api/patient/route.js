import connectDB from "@/db/connectdb";
import Patient from "@/models/Patient";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ FIX: ensure correct data types
    const patientData = {
      name: body.name,
      age: Number(body.age), // 🔥 IMPORTANT
      gender: body.gender,
      doctorName: body.doctorName,
      address: body.address,
    };

    console.log("Incoming Data:", patientData); // ✅ debug

    const patient = await Patient.create(patientData);

    return Response.json({ patient }, { status: 201 });
  } catch (error) {
    console.log("ERROR:", error); // ✅ VERY IMPORTANT

    return Response.json(
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


