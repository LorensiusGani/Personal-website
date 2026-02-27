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
    title: "Full Stack Developer Intern",
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
    <div id="about" className="w-full bg-black px-12 scroll-mt-24 py-4">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">About</h1>
      </div>

      <p className="flex flex-col justify-center items-center text-white mt-5 md:mx-5 text-justify text-lg md:text-xl">
        As Computer Science undergraduate at BINUS University with hands-on
        experience as a Full Stack Developer Intern, specializing in
        React/Next.js (TypeScript) and ASP.NET Core Web API. Experienced in
        developing responsive web applications, fixing production bugs, and
        ensuring system stability and software quality. Have strong analytical
        and problem-solving skills, with attention to detail and a
        quality-driven mindset. Adaptable to new technologies and experienced in
        collaborative team environments. Passionate about continuous learning
        and building reliable, impactful digital solutions.
      </p>

      <div className="h-1 mt-7 mx-5 bg-white"></div>

      <div className="text-white mt-8">
        <h3 className="mt-8 mb-8 text-3xl md:text-5xl font-bold text-center">
          Work Experience
        </h3>

        <div className="max-w-5xl mx-auto mt-5">
          <ul className="relative border-l border-gray-500 ml-4">
            {workExperiences.map((item, index) => (
              <li key={index} className="mb-8 ml-8 relative">
                {/* Bullet */}
                <span className="absolute -left-10 top-0 w-4 h-4 bg-white rounded-full shadow-md"></span>

                {/* Content Card */}
                <div className="bg-neutral-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {item.company} | {item.date}
                  </p>

                  {item.description && (
                    <ul className="mt-3 text-gray-300 list-disc list-inside space-y-2 text-justify">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  )}

                  {item.skills && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-white">
        <h3 className="mt-8 mb-8 text-3xl md:text-5xl font-bold text-center">
          Organizational Experience
        </h3>

        <div className="max-w-5xl mx-auto mt-5">
          <ul className="relative border-l border-gray-500 ml-4">
            {experiences.map((item, index) => (
              <li key={index} className="mb-8 ml-8 relative">
                {/* Bullet */}
                <span className="absolute -left-10 top-0 w-4 h-4 bg-white rounded-full shadow-md"></span>

                {/* Content Card */}
                <div className="bg-neutral-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-1">{item.date}</p>

                  {item.description && (
                    <p className="mt-3 text-gray-300 text-justify">
                      {item.description}
                    </p>
                  )}

                  {item.skills && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.images && (
                    <div className="mt-5 flex flex-col md:flex-row gap-6">
                      {item.images.map((img, i) => (
                        <Image
                          key={i}
                          src={img}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="rounded-lg object-cover"
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
  );
};

export default About;
