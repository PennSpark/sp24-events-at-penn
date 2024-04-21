import { app } from "../../lib/firebase";
import { getFirestore, collection, doc, getDocs, query, orderBy, limit } from "firebase/firestore";

const db = getFirestore(app);

export async function GET(request: Request) {
    const q = query(collection(db, "events"), orderBy("start_time"), limit(20));
    const docSnaps = await getDocs(q);

    console.log(docSnaps.docs.map((doc) => doc.data()));

    if (!docSnaps.empty) {
        return Response.json({
            status: 200,
            body: docSnaps.docs.map((doc) => doc.data()),
        });
    } else {
        return Response.json({
            status: 400,
            body: `No events were found.`,
        });
    }
}
