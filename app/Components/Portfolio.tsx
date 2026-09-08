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
    demo: "https://vetch-webagent.vercel.app/",
  },
  {
    title: "Maung - Landing Page",
    description: "Go, HTMX, Tailwind CSS",
    image: "/Assets/Maung-landing-page.png",
    demo: "https://maung-landing-page.vercel.app/",
  },
  {
    title: "Maung Stock Management",
    description: "Laravel, Tailwind CSS, PostgreSQL",
    image: "/Assets/Maung-stock.png",
    demo: "https://stock.maung-prod.web.id/",
  },
  {
    title: "Maung Games Account Manager",
    description: "Next JS, Go, Tailwind CSS, PostgreSQL",
    image: "/Assets/Maung-account.png",
    demo: "https://auth.maung-prod.web.id/",
  },
  {
    title: "Aggre",
    description: "Next JS, .NET, Tailwind CSS, PostgreSQL",
    image: "/Assets/Aggre.png",
    demo: "https://aggre.net/",
  },
];

// Simple external-link icon
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="
        bg-white
        dark:bg-black
        text-slate-900
        dark:text-white
        px-6
        sm:px-10
        lg:px-16
        py-16
        scroll-mt-20
        transition-colors
        duration-300
      "
    >
      {/* ================= PROJECT SECTION ================= */}
      <div className="text-center mb-12">
        <p className="text-xl md:text-2xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold">
          Portfolio
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-slate-900 dark:text-white">
          Selected Projects
        </h2>
        <p className="text-slate-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          A showcase of full-stack web applications, landing pages, and management systems built with modern web technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              bg-slate-50
              dark:bg-neutral-900
              border
              border-slate-200
              dark:border-neutral-800
              hover:border-[#3D8D7A]/50
              dark:hover:border-[#3D8D7A]/50
              rounded-2xl
              overflow-hidden
              shadow-sm
              hover:shadow-xl
              transition
              duration-300
              flex
              flex-col
              group
            "
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-neutral-800">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={500}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 text-white"
                >
                  <ExternalLinkIcon className="w-5 h-5" />
                  <span className="text-base sm:text-lg font-bold">Visit Website</span>
                </a>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#3D8D7A] transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}