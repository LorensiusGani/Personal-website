"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaCheckCircle,
  FaLayerGroup,
  FaInfoCircle,
  FaLaptopCode,
} from "react-icons/fa";

import { Project, projects } from "../lib/projects";
export type { Project };
export { projects };

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Lock body scroll and handle Escape key to close
  useEffect(() => {
    if (!selectedProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, closeModal]);

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
      {/* ================= SECTION HEADER ================= */}
      <div className="text-center mb-12 sm:mb-16">
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

      {/* ================= PROJECT GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="
              bg-slate-50
              dark:bg-neutral-900/90
              border
              border-slate-200
              dark:border-neutral-800
              hover:border-[#3D8D7A]/60
              dark:hover:border-[#3D8D7A]/60
              rounded-2xl
              overflow-hidden
              shadow-sm
              hover:shadow-2xl
              hover:shadow-[#3D8D7A]/10
              transition-all
              duration-300
              flex
              flex-col
              group
            "
          >
            {/* Image Preview Container */}
            <div
              onClick={() => openModal(project)}
              className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-neutral-800 cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Category Pill Tag Overlay */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/70 backdrop-blur-md text-[#3D8D7A] border border-[#3D8D7A]/30 shadow-sm">
                  {project.category}
                </span>
              </div>

            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => openModal(project)}
                  className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#3D8D7A] transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-gray-400 mt-2 text-sm leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="
                        text-[11px]
                        font-medium
                        px-2.5
                        py-0.5
                        rounded-md
                        bg-slate-200/70
                        dark:bg-white/5
                        text-slate-700
                        dark:text-gray-300
                        border
                        border-slate-300/60
                        dark:border-white/10
                      "
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-gray-400 border border-slate-300/40 dark:border-white/5">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-neutral-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => openModal(project)}
                  className="
                    flex-1
                    py-2.5
                    px-4
                    rounded-xl
                    bg-slate-200/80
                    hover:bg-[#3D8D7A]
                    text-slate-800
                    hover:text-white
                    dark:bg-neutral-800
                    dark:text-gray-200
                    dark:hover:bg-[#3D8D7A]
                    dark:hover:text-white
                    text-xs sm:text-sm
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition-all
                    duration-200
                    cursor-pointer
                  "
                >
                  <FaInfoCircle className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      py-2.5
                      px-3.5
                      rounded-xl
                      border
                      border-[#3D8D7A]/40
                      text-[#3D8D7A]
                      hover:bg-[#3D8D7A]
                      hover:text-white
                      text-xs sm:text-sm
                      font-semibold
                      flex
                      items-center
                      gap-1.5
                      transition-all
                      duration-200
                    "
                    title="Live Site"
                    aria-label={`Live site for ${project.title}`}
                  >
                    <span>Live</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      p-2.5
                      rounded-xl
                      border
                      border-slate-300
                      dark:border-white/10
                      text-slate-700
                      dark:text-gray-300
                      hover:text-[#3D8D7A]
                      hover:border-[#3D8D7A]
                      transition-all
                      duration-200
                    "
                    title="GitHub Repository"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PROJECT DETAIL MODAL ================= */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            p-3
            sm:p-6
            bg-black/75
            backdrop-blur-md
            animate-fade-in
          "
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="
              relative
              w-full
              max-w-3xl
              max-h-[90vh]
              overflow-y-auto
              bg-white
              dark:bg-[#0E1318]
              border
              border-slate-200
              dark:border-white/10
              rounded-2xl
              shadow-2xl
              text-slate-900
              dark:text-white
              flex
              flex-col
              custom-scrollbar
            "
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#0E1318]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#3D8D7A]/10 text-[#3D8D7A] border border-[#3D8D7A]/30">
                  {selectedProject.category}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="
                  p-2.5
                  rounded-xl
                  bg-slate-100
                  hover:bg-rose-100
                  text-slate-500
                  hover:text-rose-600
                  dark:bg-white/5
                  dark:hover:bg-rose-950/60
                  dark:text-gray-400
                  dark:hover:text-rose-400
                  border
                  border-slate-200
                  dark:border-white/10
                  transition
                  cursor-pointer
                "
                title="Close (Esc)"
                aria-label="Close dialog"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Preview Image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-neutral-900 shadow-inner">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <p className="text-sm sm:text-base text-[#3D8D7A] font-medium mt-1">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Overview / Background */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                  <FaInfoCircle className="text-[#3D8D7A]" />
                  <span>About The Project</span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                  <FaCheckCircle className="text-[#3D8D7A]" />
                  <span>Key Features</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="
                        flex
                        items-start
                        gap-2.5
                        p-3
                        rounded-xl
                        bg-slate-50
                        dark:bg-white/[0.03]
                        border
                        border-slate-200/80
                        dark:border-white/5
                        text-xs sm:text-sm
                        text-slate-700
                        dark:text-gray-300
                      "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3D8D7A] mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                  <FaLayerGroup className="text-[#3D8D7A]" />
                  <span>Technologies & Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        rounded-lg
                        bg-slate-100
                        dark:bg-[#3D8D7A]/10
                        text-slate-800
                        dark:text-[#A3D1C6]
                        border
                        border-slate-300
                        dark:border-[#3D8D7A]/30
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role & Contributions */}
              {selectedProject.role && (
                <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                    <FaLaptopCode className="text-[#3D8D7A]" />
                    <span>Role & Contribution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    {selectedProject.role}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer / CTAs */}
            <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-50 dark:bg-[#0B0F13] border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={closeModal}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  border-slate-300
                  dark:border-white/10
                  hover:bg-slate-200
                  dark:hover:bg-white/5
                  text-slate-700
                  dark:text-gray-300
                  text-sm
                  font-semibold
                  transition
                  cursor-pointer
                "
              >
                Close
              </button>

              <div className="flex items-center gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      px-4
                      py-2.5
                      rounded-xl
                      border
                      border-slate-300
                      dark:border-white/10
                      hover:border-[#3D8D7A]
                      text-slate-800
                      dark:text-white
                      hover:text-[#3D8D7A]
                      text-sm
                      font-semibold
                      flex
                      items-center
                      gap-2
                      transition
                    "
                  >
                    <FaGithub size={16} />
                    <span>Repository</span>
                  </a>
                )}

                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      px-6
                      py-2.5
                      rounded-xl
                      bg-[#3D8D7A]
                      hover:bg-[#4EA792]
                      text-white
                      text-sm
                      font-bold
                      flex
                      items-center
                      gap-2
                      shadow-md
                      hover:shadow-lg
                      hover:shadow-[#3D8D7A]/25
                      transition
                    "
                  >
                    <span>Visit Live Website</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}