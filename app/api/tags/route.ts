import { app } from "../../lib/firebase";
import { getFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore";

const db = getFirestore(app);

export async function GET(request: Request) {
    console.log("GET /api/tags")
    const querySnapshot = await getDocs(collection(db, "tags"));
    const data = querySnapshot.docs.map((doc) => { 
        const id = doc.id;
        return {
            id: id,
            ...doc.data(),
        }
    });

    return Response.json({
        status: 200,
        body: data,
    });
}
