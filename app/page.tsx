import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className = "h-full">
        <p>Events at Penn</p>
        <img 
          src="https://www.southernliving.com/thmb/a4b73J7C4S4wgSmymmEgXRCmACA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-185743593-2000-507c6c8883a44851885ea4fbc10a2c9e.jpg"
          height={500}
          width={500}
          alt={"dog"}/>
      </div>
    </>
  );
}
