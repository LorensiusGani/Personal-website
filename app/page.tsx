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
          <div className="grid lg:grid-cols-2 items-center min-h-[85vh] gap-8 mt-8 md:mt-0">
            {/* LEFT */}
            <div>
              <span
                className="
                  text-[#3D8D7A]
                  uppercase
                  md:tracking-[2px]
                  text-2xl
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
    md:text-5xl
    lg:text-6xl
    font-black
    leading-[1.05]
    tracking-tight
  "
              >
                Lorensius
                <span className="block text-[#3D8D7A]">Bernard Gani</span>
              </h1>

              <p
                className="
                  mt-8
                  text-lg
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
                  <h3 className="text-4xl font-bold text-white">5</h3>
                  <p className="text-gray-500">
                    Completed
                    <br />
                    Projects
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-white">1</h3>
                  <p className="text-gray-500">Internship</p>
                </div>

                {/* <div>
                  <h3 className="text-4xl font-bold text-white">100+</h3>
                  <p className="text-gray-500">Bugs Fixed</p>
                </div> */}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <a
                  href="/CV/CV-Lorensius-Bernard-Gani.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-8
                    py-4
                    rounded-xl
                    bg-[#3D8D7A]
                    hover:bg-[#4EA792]
                    transition
                    font-semibold
                  "
                >
                  View CV
                </a>

                <a
                  href="#portfolio"
                  className="
                    px-8
                    py-4
                    rounded-xl
                    border
                    border-white/10
                    hover:border-[#3D8D7A]
                    transition
                    font-semibold
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
                  md:mb-0 mb-10
                "
              >
                <img
                  src="/Assets/personal-2.png"
                  alt="Lorensius Bernard Gani"
                  className="
                   w-[260px] md:w-[300px]
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
