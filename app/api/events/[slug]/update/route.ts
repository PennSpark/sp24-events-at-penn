import { cleanObject } from "@/app/lib/utils";
import { app } from "../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc, updateDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

const db = getFirestore(app);

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    const req = request.nextUrl.searchParams;
    try {
        const docRef = doc(db, "events", params.slug);

        const tagsRef = doc(db, "tags", req.get("tags"));

        const organizersRef = doc(db, "organizers", req.get("organizers"));

        let docObj = cleanObject({
            slug: req.get("slug"),
            name: req.get("name"),
            location: {
                geopoint : new GeoPoint(
                    Number(req.get("lat")), 
                    Number(req.get("lng")),
                ),
                name: req.get("location_name")
            },
            desc: req.get("desc"),
            url: req.get("url"),
            img: req.get("img"),
            tags: tagsRef, // make array
            organizers: organizersRef,
            views: Number(req.get("views")),
            price: Number(req.get("price")),
            max_occupancy: Number(req.get("max_occupancy")),
            is_active: Boolean(req.get("is_active")),
            signup_deadline: new Timestamp(Number(req.get("signup_deadline")), 0),
            start_time: new Timestamp(Number(req.get("start_time")), 0),
            end_time: new Timestamp(Number(req.get("end_time")), 0),
            date_published: new Timestamp(Number(req.get("date_published")), 0),
        });

        await updateDoc(docRef, docObj)

        revalidatePath(`/events/${params.slug}`);

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
