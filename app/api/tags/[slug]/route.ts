import { app } from "../../../lib/firebase";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    console.log("GET /api/tags/[slug]", params.slug)
    const docRef = doc(db, "tags", params.slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return Response.json({
            status: 200,
            body: {
                id: params.slug,
                ...docSnap.data(),
            }
        });
    } else {
        return Response.json({
            status: 400,
            body: `No event with slug '${params.slug}' was found.`,
        });
    }
}
