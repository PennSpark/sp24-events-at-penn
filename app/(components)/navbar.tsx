import Image from "next/image";

export default function Navbar() {
    return (
        <>
            <div className = "flex justify-between mx-24 mt-8">
                <div className = "text-lg font-bold">By Penn Spark</div>
                <div className = "flex space-x-10 font-semibold">
                    <p>Explore</p>
                    <p>About</p>
                    <p>Login</p>
                </div>
            </div>
        </>
    );
}
