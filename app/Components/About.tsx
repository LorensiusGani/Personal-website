import Image from "next/image";

type Experience = {
  title: string;
  date: string;
  description?: string;
  skills?: string[];
  images?: string[];
};

type WorkExperience = {
  title: string;
  company: string;
  date: string;
  description?: string[];
  skills?: string[];
};

const experiences: Experience[] = [
  {
    title:
      "Coordinator Of Equipment Division - BINUS Catholic Student Association",
    date: "February 2024 - February 2025",
    description:
      "As the Coordinator of the Equipment Division at BINUS Catholic Student Association, I manage and prepare all equipment needed to ensure events run smoothly and efficiently. I manage logistics and inventory readiness while building strong teamwork and communication within the division to support successful program execution.",
    skills: ["Time Management", "Communication", "Teamwork"],
    images: ["/Assets/Certificate.jpeg"],
  },
  {
    title:
      "Vice Coordinator of the Equipment Division for the Easter Event - BINUS Catholic Student Association",
    date: "January 2024 - March 2024",
    description:
      "As the Vice Coordinator of the Equipment Division for the Easter Event, I am responsible for preparing and managing all equipment required to support the smooth execution of the event. I coordinate logistics, ensure equipment readiness and proper setup, and collaborate closely with the team to guarantee that all technical and operational needs are fulfilled efficiently and on time.",
    skills: ["Time Management", "Communication", "Teamwork"],
    images: ["/Assets/Foto-Paskah-1.jpeg", "/Assets/Foto-Paskah-2.jpeg"],
  },
  {
    title:
      "Coordinator of Equipment Division for LDK Activist - BINUS Catholic Student Association",
    date: "January 2024 - January 2024",
    description:
      "As the Coordinator of the Equipment Division for the LDK event, I was responsible for managing and preparing all equipment required to support the smooth execution of the program. I ensured equipment readiness, coordinated logistics, and worked closely with the team to guarantee that all technical and operational needs were fulfilled effectively and on time.",
    skills: ["Time Management", "Communication", "Teamwork"],
    images: ["/Assets/Foto-LDK-Activist.jpeg"],
  },
  {
    title:
      "Equipment Division Staff of PMB - BINUS Catholic Student Association",
    date: "May 2023 - Dec 2023",
    description:
      "As an Equipment Division Staff for PMB 2023 at BINUS Catholic Student Association, I assisted in preparing and organizing all equipment necessary for the event, which aimed to introduce the organization to new students. I supported logistical coordination and ensured that all equipment was properly set up and ready to ensure the successful implementation of the event.",
    skills: ["Communication", "Teamwork"],
    images: ["/Assets/PMB-1.jpeg", "/Assets/PMB-2.jpeg"],
  },
];

const workExperiences: WorkExperience[] = [
  {
    title: "Full Stack Developer",
    company: "PT Enseval Putra Megatrading",
    date: "April 2026 - Present",
    description: [
      "Developed web applications using React/Next.js (TypeScript) for the frontend and ASP.NET Core Web API for the backend.",
    ],
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ASP.NET Web Core API",
      "PostgreSQL",
      "Scrum Methodology",
      "Github",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Accelist Lentera Indonesia",
    date: "February 2025 - February 2026",
    description: [
      "Developed and maintained web applications using React/Next.js (TypeScript) for the frontend and ASP.NET Core Web API for the backend.",
      "Participated in sprint planning, task estimation, and daily standup meetings to ensure project delivery aligned with timeline and scope.",
      "Performed testing and identified bugs in live production applications before and after deployment.",
    ],
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ASP.NET Web Core API",
      "PostgreSQL",
      "SQL",
      "Scrum Methodology",
      "Bug Fixing",
      "Task Tracking",
      "Github",
    ],
  },
];

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="
        relative
        bg-[#050505]
        text-white
        pt-12
        px-6
        md:px-12
        overflow-hidden
        scroll-mt-20
      "
    >
      {/* Glow */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-[#3D8D7A]/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3D8D7A]/10 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-3xl md:text-4xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold">
            About Me
          </p>

          <p className="text-white mt-5 max-w-5xl mx-auto text-xl">
            Passionate Full Stack Developer focused on building scalable web
            applications with modern technologies.
          </p>
        </div>

        {/* Intro Card */}
        <div
          className="
            bg-[#0D1117]
            border
            border-[#3D8D7A]/20
            rounded-3xl
            p-8
            md:p-12
            mb-16
          "
        >
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-3xl font-bold mb-5">Full Stack Developer</h3>

              <p className="text-gray-300 leading-relaxed">
                Computer Science undergraduate at BINUS University with
                experience building modern web applications using ASP.NET Core,
                Next.js, TypeScript, PostgreSQL and React. Experienced in bug
                fixing, feature development, software maintenance, and
                collaborative agile environments.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black rounded-2xl p-6">
                <h4 className="text-4xl font-bold text-[#3D8D7A]">5</h4>
                <p className="text-gray-400">Completed Projects</p>
              </div>

              <div className="bg-black rounded-2xl p-6">
                <h4 className="text-4xl font-bold text-[#3D8D7A]">1</h4>
                <p className="text-gray-400">Internship</p>
              </div>

              <div className="bg-black rounded-2xl p-6">
                <h4 className="text-4xl font-bold text-[#3D8D7A]">100+</h4>
                <p className="text-gray-400">Bugs Fixed</p>
              </div>

              <div className="bg-black rounded-2xl p-6">
                <h4 className="text-4xl font-bold text-[#3D8D7A]">4+</h4>
                <p className="text-gray-400">Years Learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <p className="text-xl md:text-2xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold">
              Experience
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Professional Journey
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <ul className="relative border-l border-[#3D8D7A]/30">
              {workExperiences.map((item, index) => (
                <li key={index} className="mb-12 ml-8 relative">
                  <span
                    className="
                      absolute
                      -left-[42px]
                      top-0
                      w-5
                      h-5
                      rounded-full
                      bg-[#3D8D7A]
                    "
                  />

                  <div
                    className="
                      bg-[#0D1117]
                      border
                      border-[#3D8D7A]/20
                      rounded-2xl
                      p-8
                    "
                  >
                    <h3 className="text-2xl font-bold">{item.title}</h3>

                    <p className="text-[#3D8D7A] mt-2">{item.company}</p>

                    <p className="text-gray-500">{item.date}</p>

                    <ul className="mt-5 space-y-3 text-gray-300">
                      {item.description?.map((desc, i) => (
                        <li key={i}>• {desc}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {item.skills?.map((skill, i) => (
                        <span
                          key={i}
                          className="
                            px-3
                            py-2
                            rounded-full
                            bg-[#3D8D7A]/10
                            border
                            border-[#3D8D7A]/30
                            text-[#A3D1C6]
                            text-sm
                          "
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Organization */}
        <div>
          <div className="text-center mb-12">
            <p className="text-xl md:text-2xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold">
              Leadership
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Organizational Experience
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <ul className="relative border-l border-[#3D8D7A]/30">
              {experiences.map((item, index) => (
                <li key={index} className="mb-12 ml-8 relative">
                  <span
                    className="
              absolute
              -left-[42px]
              top-0
              w-5
              h-5
              rounded-full
              bg-[#3D8D7A]
            "
                  />

                  <div
                    className="
              bg-[#0D1117]
              border
              border-[#3D8D7A]/20
              rounded-2xl
              p-8
            "
                  >
                    <h3 className="text-2xl font-bold">{item.title}</h3>

                    <p className="text-[#3D8D7A] mt-2">
                      BINUS Catholic Student Association
                    </p>

                    <p className="text-gray-500">{item.date}</p>

                    <p className="text-gray-300 mt-5 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {item.skills?.map((skill, i) => (
                        <span
                          key={i}
                          className="
                    px-3
                    py-2
                    rounded-full
                    bg-[#3D8D7A]/10
                    border
                    border-[#3D8D7A]/30
                    text-[#A3D1C6]
                    text-sm
                  "
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {item.images && (
                      <div className="grid md:grid-cols-2 gap-5 mt-8">
                        {item.images.map((img, i) => (
                          <Image
                            key={i}
                            src={img}
                            alt={item.title}
                            width={400}
                            height={250}
                            className="
                      w-full
                      h-56
                      object-cover
                      rounded-xl
                      border
                      border-white/10
                    "
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
