import { app } from "../../../../lib/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = getFirestore(app);

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {

    try {
        const docRef = doc(db, "events", params.slug);
        await deleteDoc(docRef);

        return Response.json({
            status: 200,
            body: `Event '${params.slug}' deleted.`,
        });
    } catch (error) {
        return Response.json({
            status: 400,
            body: `Error deleting event '${params.slug}'`,
            e: error
        });
    }
}
