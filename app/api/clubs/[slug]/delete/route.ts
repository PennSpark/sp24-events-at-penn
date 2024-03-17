import FirebaseApp from "../../../../lib/firebase";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(FirebaseApp);

export async function GET(request: Request, { params }: { params: { slug: string }}) {
    if (params.slug) {
        const slug = params.slug;
        const docRef = doc(db, "clubs", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await deleteDoc(docRef);
            return Response.json({
                status: 200,
                body: `Club with slug '${slug}' was deleted.`,
            });
        } else {
            return Response.json({
                status: 404,
                body: `No club with slug '${slug}' was found.`,
            });
        }
    } else {
        return Response.json({
            status: 400,
            body: "No slug was provided.",
        });
    }
}
