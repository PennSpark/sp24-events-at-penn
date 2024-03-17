import {app} from "../../../lib/firebase";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const docRef = doc(db, "events", params.slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return Response.json({
            status: 200,
            body: docSnap.data(),
        });
    } else {
        return Response.json({
            status: 400,
            body: `No event with slug '${params.slug}' was found.`,
        });
    }
}