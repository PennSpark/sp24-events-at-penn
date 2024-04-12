import Image from "next/image";

const images = Array(6).fill(0);

export default function Event({ params }: { params: { event: string } }) {
    return (
        <div className = "min-h-screen h-fit px-24 bg-paper-bg bg-no-repeat bg-center bg-cover">
            <div>
                <p className = "text-5xl font-extrabold pt-20">
                    {params.event}
                </p>
                <div className = "grid grid-cols-2 gap-4 place-content-center gap-x-20">
                
                    <table className="table-auto text-lg mt-5">
                        <tbody>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Organizer</td>
                                <td>Organizer 1</td>
                            </tr>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Time</td>
                                <td>3/17 6-7pm</td>
                            </tr>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Tag(s)</td>
                                <td>Sports</td>
                            </tr>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Location</td>
                                <td>Annenberg Center</td>
                            </tr>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Address</td>
                                <td>1234 Market Street</td>
                            </tr>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Registration</td>
                                <td>tinyurl</td>
                            </tr>
                            <tr>
                                <td className = "text-gray-700 pr-5 align-top">Description</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis, enim quis scelerisque placerat, justo leo fringilla lacus, et lobortis urna purus a nunc. Quisque facilisis ipsum ornare metus accumsan congue. Proin cursus justo ut condimentum pellentesque. Morbi sollicitudin elit eget metus eleifend suscipit. Cras ipsum tortor, bibendum eget mollis id, bibendum non justo. In vel bibendum mauris. Suspendisse lacinia non nibh sed consequat.</td>
                            </tr>
                        </tbody>
                    </table>
                <div>
                    <Image
                        src = "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                        alt = "cat"
                        width = {520}
                        height = {520}
                        style = {{borderRadius: "8px", objectFit: "contain"}}
                    />
                </div>
                <Image 
                    src = "/images/person2.png"
                    alt = "person image"
                    width = {200}
                    height = {200}
                    className = "absolute left-[50%] -translate-x-1/2"
                />
            </div>
                    
            <div className = "my-16">
                <p className = "text-2xl font-bold">Image Gallery</p>
                
                <div className = "flex gap-5 overflow-x-scroll my-8">
                    {images.map((img, index) => (
                        <>
                            <Image
                                src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1200px-Labrador_Retriever_portrait.jpg"
                                alt = "dog"
                                height = {400}
                                width = {400} 
                                style = {{objectFit: "contain"}}  
                            />
                        </>
                    ))}
                </div>
            </div>

            <div className = "my-16">
                <p className = "text-2xl font-bold">Relevant Events</p>
                
                <div className = "flex gap-5 overflow-x-scroll my-8">
                    {images.map((img, index) => (
                        <>
                            <Image
                                src = "https://cdn.pixabay.com/photo/2016/12/13/22/25/bird-1905255_1280.jpg"
                                alt = "bird"
                                height = {400}
                                width = {400}   
                            />
                        </>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}
