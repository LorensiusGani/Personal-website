import Image from "next/image";
import SocialMedia from "./Components/SocialMedia";

export default function Home() {
  return (
    <div id="home" className="h-screen w-full bg-black">
      <SocialMedia />
      <div className="max-w-screen mx-auto flex flex-col items-center justify-center h-full px-8 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-5xl sn:7-xl font-bold text-white">
            I'm Lorensius Bernard Gani
          </h1>
          <p className="text-white text-2xl py-3 font-semibold">
            From Binus University
          </p>
          <p className="text-white text-2xl font-semibold">
            Front End Developer
          </p>
        </div>
        <div>
          {/* <img
            src={personalphoto}
            alt="personal photo"
            className="rounded-xl ml-10 w-56 h-72"
          /> */}
        </div>
      </div>
    </div>
  );
}
