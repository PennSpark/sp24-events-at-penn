import { app } from "../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc, updateDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = getFirestore(app);

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {

    try {
        const docRef = doc(db, "events", params.slug);
        
        const req = request.nextUrl.searchParams;

        let docObj = {
            slug: req.get("slug"),
            name: req.get("name"),
            channels: JSON.parse(req.get("channels") || ""),
            desc: req.get("desc"),
            email: req.get("email"),
            // events: req.get("events")?.split(","),
            img: req.get("img"),
            // tags: req.get("tags")?.split(","), // make array
        }

        await updateDoc(docRef, docObj)

        return Response.json({
            status: 201,
            body: docObj,
        });
      
    } catch (error) {
        return Response.json({
            status: 400,
            body: `Error updating event '${params.slug}'`,
            e: error
        });
    }
}
