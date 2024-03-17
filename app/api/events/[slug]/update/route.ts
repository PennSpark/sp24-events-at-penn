import FirebaseApp from "../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = getFirestore(FirebaseApp);

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {

    const docRef = doc(db, "events", params.slug);
    

    try {
        const nameEntry = request.nextUrl.searchParams.get("name");
        
        await updateDoc(docRef, {
            name: nameEntry
        })

        return Response.json({
            status: 201,
            body: `Success in updating to new name: ${nameEntry}`,
        });
      
    } catch (error) {
        return Response.json({
            status: 400,
            body: `No event with slug '${params.slug}' was found.`,
            e: error
        });
    }
}
