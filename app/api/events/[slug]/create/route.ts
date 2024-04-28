import { cleanObject } from "@/app/lib/utils";
import { app } from "../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc, updateDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

const db = getFirestore(app);

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const docRef = doc(db, "events", params.slug);

        revalidatePath(`/events/${params.slug}`);

        return Response.json({
            status: 201,
            body: {},
        });
    } catch (error) {
        return Response.json({
            status: 400,
            body: `Error creating event ${params.slug}`,
            e: error
        });
    }
}
