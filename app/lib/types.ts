import { GeoPoint, Timestamp } from "firebase/firestore";

export type Event = {
    slug: string;
    name: string;
    location: GeoPoint;
    description: string;
    url?: string;
    img: string;
    tags: string[];
    organization: string[];
    views: number;
    price: number;
    max_occupancy: number;
    is_active: boolean;
    signup_deadline: Timestamp;
    start_time: Timestamp;
    end_time: Timestamp;
    date_published: Timestamp;
}
