//import SocialMedia from "./Components/SocialMedia";
import About from "./Components/About";
import Portfolio from "./Components/Portfolio";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <>
      <section
        id="home"
        className="
          relative
          overflow-hidden
          bg-[#0B0F14]
          min-h-screen
          pt-24
        "
      >
        {/* <SocialMedia /> */}

        <div
          className="relative z-10 max-w-7xl mx-auto px-6
        md:px-12"
        >
          <div className="grid lg:grid-cols-2 items-center min-h-[85vh] gap-8 md:gap-12 lg:gap-8 mt-4 md:mt-6 lg:mt-0 py-8 lg:py-0">
            {/* LEFT */}
            <div>
              <span
                className="
                  text-[#3D8D7A]
                  uppercase
                  tracking-[2px]
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  font-bold
                "
              >
                Full Stack Developer
              </span>

              <h1
                className="
                  mt-4
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-black
                  leading-[1.1]
                  tracking-tight
                "
              >
                Lorensius
                <span className="block text-[#3D8D7A]">Bernard Gani</span>
              </h1>

              <p
                className="
                  mt-6
                  md:mt-8
                  text-base
                  sm:text-lg
                  text-gray-400
                  leading-relaxed
                  max-w-2xl
                "
              >
                Computer Science Student at BINUS University and Full Stack
                Developer focused on building modern web applications using
                ASP.NET Core, Next.js, TypeScript, and PostgreSQL.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">5</h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Completed
                    <br />
                    Projects
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">1</h3>
                  <p className="text-gray-500 text-sm sm:text-base">Internship</p>
                </div>

                {/* <div>
                  <h3 className="text-4xl font-bold text-white">100+</h3>
                  <p className="text-gray-500">Bugs Fixed</p>
                </div> */}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="/CV/CV - Lorensius Bernard Gani - updated.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-6
                    sm:px-8
                    py-3.5
                    sm:py-4
                    rounded-xl
                    bg-[#3D8D7A]
                    hover:bg-[#4EA792]
                    transition
                    font-semibold
                    text-center
                  "
                >
                  View CV
                </a>

                <a
                  href="#portfolio"
                  className="
                    px-6
                    sm:px-8
                    py-3.5
                    sm:py-4
                    rounded-xl
                    border
                    border-white/10
                    hover:border-[#3D8D7A]
                    transition
                    font-semibold
                    text-center
                  "
                >
                  View Projects
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="
                  relative
                  rounded-4xl
                  overflow-hidden
                  border
                  border-white/10
                  bg-[#111827]
                  shadow-[0_0_60px_rgba(61,141,122,0.15)]
                  my-6
                  lg:my-0
                "
              >
                <img
                  src="/Assets/personal-2.png"
                  alt="Lorensius Bernard Gani"
                  className="
                    w-[260px]
                    sm:w-[290px]
                    md:w-[320px]
                    lg:w-[300px]
                    object-cover
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Portfolio />
      <Footer />
    </>
  );
}
