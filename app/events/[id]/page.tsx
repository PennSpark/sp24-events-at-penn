import Image from "next/image";

const images = Array(6).fill(0);

export default function Event({ params }: { params: { slug: string } }) {
    return (
        <>
            <div className = "h-full">

            <div className = "grid grid-cols-2 gap-4 place-content-center h-48">
                <div>
                    <p className = "text-3xl font-extrabold">
                        Event Title
                        {params.slug}
                    </p>

                    <p>Organizer</p>
                    <p>Time</p>
                    <p>Tag(s)</p>
                    <p>Location</p>
                    <p>Registration</p>
                    <p>Description</p>
                </div>
                
                <div>
                    <Image
                        src = "next.svg"
                        alt = "dog"
                        height = {30}
                        width = {30}
                    />
                </div>
            </div>
                
            <p className = "text-2xl font-bold">Image Gallery</p>
            
            {images.map((img, index) => (
                <>
                    <Image
                        src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1200px-Labrador_Retriever_portrait.jpg"
                        alt = "dog"
                        height = {400}
                        width = {400}   
                    />
                </>
            ))} 
            
            </div>
        </>
    );
}
