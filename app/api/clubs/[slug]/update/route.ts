import FirebaseApp from "../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

const db = getFirestore(FirebaseApp);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
        const docRef = doc(db, "clubs", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return Response.json({
                status: 200,
                body: docSnap.data(),
            });
        } else {
            return Response.json({
                status: 400,
                body: `No event with slug '${slug}' was found.`,
            });
        }
    }
}