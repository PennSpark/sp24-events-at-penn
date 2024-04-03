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
            location: new GeoPoint(
                Number(req.get("lat")), 
                Number(req.get("lng")),
            ),
            desc: req.get("desc"),
            url: req.get("url"),
            img: req.get("img"),
            // tags: req.get("tags")?.split(","), // make array
            // organizers: req.get("organizers")?.split(","),
            views: Number(req.get("views")),
            price: Number(req.get("price")),
            max_occupancy: Number(req.get("max_occupancy")),
            is_active: Boolean(req.get("is_active")),
            signup_deadline: new Timestamp(Number(req.get("signup_deadline")), 0),
            start_time: new Timestamp(Number(req.get("start_time")), 0),
            end_time: new Timestamp(Number(req.get("end_time")), 0),
            date_published: new Timestamp(Number(req.get("date_published")), 0),
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
