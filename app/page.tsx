import About from "./Components/About";
import Portfolio from "./Components/Portfolio";
import GithubActivity from "./Components/GithubActivity";
import SkillSlider from "./Components/SkillSlider";
import ToolSlider from "./Components/ToolSlider";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="
          relative
          overflow-hidden
          bg-slate-100/70
          dark:bg-[#0B0F14]
          text-slate-900
          dark:text-white
          min-h-screen
          pt-24
          transition-colors
          duration-300
        "
      >
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
                  text-slate-900
                  dark:text-white
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
                  text-slate-600
                  dark:text-gray-400
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
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">5</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm sm:text-base">
                    Completed
                    <br />
                    Projects
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">1</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm sm:text-base">Internship</p>
                </div>
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
                    text-white
                    transition-all
                    font-semibold
                    text-center
                    shadow-md
                    hover:shadow-lg
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
                    border-slate-300
                    dark:border-white/10
                    text-slate-800
                    dark:text-white
                    hover:border-[#3D8D7A]
                    hover:text-[#3D8D7A]
                    dark:hover:border-[#3D8D7A]
                    dark:hover:text-white
                    transition-all
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
                  border-slate-200
                  dark:border-white/10
                  bg-white
                  dark:bg-[#111827]
                  shadow-[0_0_40px_rgba(61,141,122,0.1)]
                  dark:shadow-[0_0_60px_rgba(61,141,122,0.15)]
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

      {/* ================= ABOUT SECTION ================= */}
      <About />

      {/* ================= PORTFOLIO SECTION ================= */}
      <Portfolio />

      {/* ================= GITHUB ACTIVITY SECTION ================= */}
      <GithubActivity />

      {/* ================= SKILLS & TOOLS SECTION ================= */}
      <section
        id="skills"
        className="
          bg-white
          dark:bg-black
          text-slate-900
          dark:text-white
          px-6
          sm:px-10
          lg:px-16
          py-8
          scroll-mt-20
          transition-colors
          duration-300
        "
      >
        <SkillSlider />
        <ToolSlider />
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  );
}
