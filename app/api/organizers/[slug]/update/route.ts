import { cleanObject } from "@/app/lib/utils";
import { app } from "../../../../lib/firebase";
import { getFirestore, collection, doc, getDoc, updateDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { NextRequest } from "next/server";
import type{ NextApiRequest } from "next";
import { revalidatePath } from "next/cache";

const db = getFirestore(app);

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {

    try {
        const docRef = doc(db, "organizers", params.slug);
        // console.log(JSON.stringify(request.body));
        //console.log(request);
        const req = request.nextUrl.searchParams;
        // console.log(req);
        const tagId = req.get("tags");
        const tagRefs = doc(db, "tags", tagId);
        // console.log(tagRefs);
        
        let docObj = cleanObject({
            slug: req.get("slug"),
            name: req.get("name"),
            desc: req.get("desc"),
            email: req.get("email"),
            tags: tagRefs,
            tagName: tagId,
            img: req.get("img"),
        });

        await updateDoc(docRef, docObj)

        revalidatePath(`/organizers/${params.slug}`);
        console.log(`revalidating /organizers/${params.slug}`)

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
