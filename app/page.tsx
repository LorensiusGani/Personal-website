import SocialMedia from "./Components/SocialMedia";
import About from "./Components/About";
import Portfolio from "./Components/Portfolio";

export default function Home() {
  return (
    <>
      <div id="home" className="h-screen w-full bg-black">
        <SocialMedia />
        <div className="max-w-screen mx-auto flex flex-col items-center justify-center h-full px-8 md:flex-row">
          <div className="flex flex-col justify-center h-full md:mt-0 mt-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              I'm Lorensius Bernard Gani
            </h1>
            <p className="text-white text-2xl py-3 font-semibold">
              Binus University - Computer Science Student
            </p>
            <p className="text-white text-2xl font-semibold">
              Front End Developer
            </p>
          </div>
          <div>
            <img
              src="/Assets/Personal.jpg"
              alt="personal photo"
              className="rounded-xl mb-10 md:mb-0 md:ml-40 w-48 h-64 object-cover"
            />
          </div>
        </div>
      </div>
      <About />
      <Portfolio />
    </>
  );
}
