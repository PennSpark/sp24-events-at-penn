import FirebaseApp from "../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useSearchParams } from 'next/navigation';

const db = getFirestore(FirebaseApp);

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

export async function POST(request: Request, { params }: { params: { slug: string } }) {
    const docRef = doc(db, "events", params.slug);

    const searchParams = useSearchParams();
    const entries = searchParams.entries();

    await updateDoc(docRef, {
        name: "new name"
    }).then(() =>  {
        return Response.json({
            status: 200,
            body: entries,
        });
    }).catch(() => {
        return Response.json({
            status: 400,
            body: `No event with slug '${params.slug}' was found.`,
        });
    })
}
