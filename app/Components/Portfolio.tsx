"use client";

import Image from "next/image";

type Project = {
  title: string;
  description: string;
  image: string;
  demo?: string;
  github?: string;
  figma?: string;
};

type Skill = {
  name: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "FootLockRE - Shoe Store",
    description: "HTML, CSS, JavaScript",
    image: "/Assets/FootLockRE.jpg",
    demo: "https://shoestore-olive.vercel.app/",
  },
  {
    title: "Vetch",
    description: "Next JS, Tailwind CSS, Express JS, PostgreSQL",
    image: "/Assets/Vetch-1.png",
    demo: "https://vetch-webagent.vercel.app//",
  },
];

const skills: Skill[] = [
  { name: "HTML", image: "/Assets/HTML.png" },
  { name: "CSS", image: "/Assets/Logo-CSS.png" },
  { name: "JavaScript", image: "/Assets/Javascript.png" },
  { name: "C#", image: "/Assets/Csharp.png" },
  { name: "React", image: "/Assets/React.png" },
  { name: "Next JS", image: "/Assets/Next.png" },
  { name: "Tailwind CSS", image: "/Assets/Tailwind.png" },
  { name: "Bootstrap", image: "/Assets/Bootstrap.png" },
  { name: "Figma", image: "/Assets/Figma.png" },
  { name: "Python", image: "/Assets/Python.png" },
  { name: "SQL", image: "/Assets/SQL.png" },
  { name: "PostgreSQL", image: "/Assets/PostgreSQL.png" },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-black text-white px-6 md:px-20 py-6 scroll-mt-24"
    >
      {/* ================= PROJECT SECTION ================= */}
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold">Portfolio</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <div className="relative group">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={500}
                className="w-full h-full object-cover transition duration-300"
              />

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition"
                >
                  <span className="text-xl font-bold">Visit Website</span>
                </a>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p className="text-gray-400 mt-2">{project.description}</p>

              <div className="flex gap-4 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {project.figma && (
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:underline"
                  >
                    Figma
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= SKILL SECTION ================= */}
      <div className="text-center py-10">
        <h1 className="text-3xl md:text-5xl font-bold">Skills</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 flex flex-col items-center hover:scale-105 transition duration-300 shadow-md"
          >
            <div className="w-30 h-30 flex items-center justify-center">
              <Image
                src={skill.image}
                alt={skill.name}
                width={150}
                height={150}
                className="object-fill max-h-full max-w-full"
              />
            </div>
            <h3 className="text-black mt-4 text-xl font-semibold text-center">
              {skill.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
