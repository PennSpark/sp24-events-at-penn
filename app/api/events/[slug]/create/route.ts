import { cleanObject } from "@/app/lib/utils";
import { app } from "../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc, updateDoc, GeoPoint, Timestamp, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

const db = getFirestore(app);

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    const req = request.nextUrl.searchParams;
    console.log(req)
    try {
        const docRef = doc(db, "events", params.slug);

        console.log("1");

        const tagsRef = doc(db, "tags", req.get("tags")?.toLowerCase());
        console.log("2");

        const organizersRef = doc(db, "organizers", req.get("organizers"));
        console.log("3");

        let docObj = {
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
            img: "https://pennspark.org/static/pic17-ca9db388b1bba8469546acd78eb24805.jpg",
            tags: [tagsRef],
            organizers: [organizersRef],
            views: Number(req.get("views")),
            price: Number(req.get("price")),
            max_occupancy: Number(req.get("max_occupancy")),
            is_active: Boolean(req.get("is_active")),
            start_time: req.get("start_time") ? Timestamp.fromDate(new Date(req.get("start_time"))) : null,
            end_time: req.get("end_time") ? Timestamp.fromDate(new Date(req.get("end_time"))) : null
        };

        console.log(docObj);

        await setDoc(docRef, docObj)

        revalidatePath(`/`, "layout");

        return Response.json({
            status: 201,
            body: docObj,
        });
    } catch (error) {
        return Response.json({
            status: 400,
            body: `Error creating event ${params.slug}`,
            e: error
        });
    }
}
