import { app } from "@/app/lib/firebase";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const db = getFirestore(app);

export async function GET() {
    const q = query(collection(db, "events"));
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
    });

    return new Response(JSON.stringify({
        status: 200,
        body: events,
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}