import { app } from "../../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc, updateDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = getFirestore(app);

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    const req = request.nextUrl.searchParams;
    try {
        const docRef = doc(db, "events", params.slug);

        let docObj = {
            location: {
                geopoint : new GeoPoint(
                    Number(req.get("lat")), 
                    Number(req.get("lng")),
                ),
                name: req.get("location_name")
            },
        }

        await updateDoc(docRef, docObj)

        return Response.json({
            status: 201,
            body: docObj,
        });
      
    } catch (error) {
        return Response.json({
            status: 400,
            body: `Error updating event ${params.slug}`,
            e: error
        });
    }
}
