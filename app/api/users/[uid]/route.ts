import { app } from "@/app/lib/firebase";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const db = getFirestore(app);

export async function GET(request: Request, { params }: { params: { uid: string } }) {
    console.log("GET /api/users/", params.uid)
    const ref = collection(db, "organizers");
    const q = query(ref, where("uid", "==", params.uid));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        return {
            id: id,
            ...doc.data(),
        }
    });

    return Response.json({
        status: 200,
        body: data[0],
    });
}
