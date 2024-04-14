import { Organizer } from "@/app/lib/types";
import Image from "next/image";
import styles from "./organizer.module.css";

async function getData(slug: string) {
    const res = await fetch(`http://localhost:3000/api/organizers/${slug}`);

    if(!res.ok) {
        throw new Error("Failed to get Organizer data");
    }

    return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
    const res = await getData(params.slug);
    const organizer: Organizer = res.body;

    return(
        <div className={styles.organizer}>
            <section className={styles.top}>
                <div className={styles.left}>
                    <h2>{organizer.name}</h2>
                    <div className={styles.info}>
                        <div className={styles.item}>
                            <h3>Categories</h3>
                        </div>
                        <div className={styles.item}>
                            <h3>Bio</h3>
                            <p>
                                {organizer.desc}
                            </p>
                        </div>
                        <div className={styles.item}>
                            <h3>Events hosted</h3>
                            <p>{organizer.events.length}</p>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.item}>
                            <div>
                                <h3>{organizer.name}&apos;s next event is</h3>
                                <h2>Event name</h2>
                                <span>Today at 2:00PM</span>
                            </div>
                            <p>

                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.img}>
                        <Image
                            src={organizer.img}
                            alt="Organizer pfp"
                            width={270}
                            height={270}
                        />
                    </div>
                </div>
            </section>
            <section className="events">

            </section>
        </div>
    )
}
