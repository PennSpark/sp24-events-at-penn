import Image from "next/image";

export default function Navbar() {
    return (
        <>
            <div className = "flex justify-between mt-8 px-10 absolute w-full">
                <div className = "text-lg font-bold">By Penn Spark</div>
                <div className = "flex space-x-8 font-semibold">
                    <p>Explore</p>
                    <p>About</p>
                    <p>Login</p>
                </div>
            </div>
        </>
    );
}