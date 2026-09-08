"use client";

import React from "react";
import {
  FaStar,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaBookmark,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

export interface RepoItem {
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  isFork: boolean;
  pushedAt: string | null;
  updatedAt: string | null;
  diskUsage: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  topics: string[];
}

interface PinnedReposProps {
  repos: RepoItem[];
  allRepos?: RepoItem[];
}

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "Personal-website":
    "Personal developer portfolio website built with Next.js 16, TypeScript, Tailwind CSS v4, and GitHub GraphQL API.",
  "Vetch-WebApp":
    "Build a telehealth platform for pet owners to find veterinarians and book online consultations.",
  "Portofolio-FootLockRE":
    "Interactive e-commerce shoe store website frontend built with HTML, CSS, and modern JavaScript.",
  "Exam-Project-2":
    "Full-stack Computer Science web application project built with Next.js, TypeScript, and modern APIs.",
  "Exam-Project-1":
    "Enterprise backend software application project developed with C# and ASP.NET Core.",
  "Personal-Portofolio":
    "Responsive developer portfolio website showcasing web applications and frontend designs.",
};

const DEMO_LINKS: Record<string, string> = {
  "Personal-website": "https://personal-website-silk-seven-51.vercel.app",
  "Vetch-WebApp": "https://vetch-webagent.vercel.app/",
  "Portofolio-FootLockRE": "https://lorensiusgani.github.io/Portofolio-FootLockRE/",
};

const DEFAULT_TOPICS: Record<string, string[]> = {
  "Personal-website": ["nextjs", "typescript", "tailwind-css", "portfolio"],
  "Vetch-WebApp": ["nextjs", "express", "postgresql", "ai-agent"],
  "Portofolio-FootLockRE": ["html", "css", "javascript", "e-commerce"],
};

function formatRelativeTime(dateString: string | null) {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Updated today";
    if (diffDays === 1) return "Updated yesterday";
    if (diffDays < 30) return `Updated ${diffDays}d ago`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Updated ${months}mo ago`;
    }
    return `Updated ${date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
  } catch {
    return null;
  }
}

function formatDiskUsage(kb: number) {
  if (!kb || kb <= 0) return null;
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function getRepoDescription(name: string, rawDesc?: string | null, lang?: string | null) {
  if (FALLBACK_DESCRIPTIONS[name]) return FALLBACK_DESCRIPTIONS[name];
  if (rawDesc && rawDesc.trim().length > 25 && rawDesc.trim().toLowerCase() !== name.toLowerCase()) {
    return rawDesc.trim();
  }
  if (lang) {
    return `Interactive software engineering project and repository developed using ${lang}.`;
  }
  return "Software engineering project and repository.";
}

export default function PinnedRepos({ repos, allRepos }: PinnedReposProps) {
  const rawList = allRepos && allRepos.length > 0 ? allRepos : repos;

  // Filter out Personal-website, Exam-Project-2 (and exam projects) and select top 2 repos
  const displayList = rawList
    .filter(
      (r) =>
        !r.name.toLowerCase().includes("personal-website") &&
        !r.name.toLowerCase().includes("exam-project-2") &&
        !r.name.toLowerCase().includes("exam-project")
    )
    .slice(0, 2);

  if (!displayList || displayList.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Featured Repositories
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#3D8D7A]/10 border border-[#3D8D7A]/30 text-[#3D8D7A] dark:text-[#A3D1C6] font-semibold">
              2 Repos
            </span>
          </h3>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
            Highlighted open-source repositories and applications
          </p>
        </div>

        <a
          href="https://github.com/LorensiusGani?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-semibold text-[#3D8D7A] hover:text-[#4ca18d] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          View all on GitHub <FaExternalLinkAlt size={12} />
        </a>
      </div>

      {/* 2-Column Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayList.map((repo, idx) => {
          const relativeTime = formatRelativeTime(repo.pushedAt || repo.updatedAt);
          const sizeStr = formatDiskUsage(repo.diskUsage);
          const description = getRepoDescription(
            repo.name,
            repo.description,
            repo.primaryLanguage?.name
          );
          const liveDemoUrl = repo.homepageUrl || DEMO_LINKS[repo.name] || null;
          const topics =
            repo.topics && repo.topics.length > 0
              ? repo.topics
              : DEFAULT_TOPICS[repo.name] || [];

          return (
            <div
              key={idx}
              className="
                group
                flex
                flex-col
                justify-between
                bg-white
                dark:bg-[#0D1117]
                border
                border-slate-200
                dark:border-[#3D8D7A]/20
                hover:border-[#3D8D7A]/60
                dark:hover:border-[#3D8D7A]/60
                rounded-2xl
                p-5
                sm:p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                shadow-sm
                dark:shadow-none
              "
            >
              <div>
                {/* Card Top Title & External Links */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 min-w-0 group/link"
                  >
                    <FaBookmark className="text-[#3D8D7A] shrink-0" size={15} />
                    <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover/link:text-[#3D8D7A] transition-colors truncate">
                      {repo.name}
                    </span>
                  </a>

                  <div className="flex items-center gap-2 shrink-0">
                    {liveDemoUrl && (
                      <a
                        href={liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Live Preview"
                        className="p-1.5 rounded-lg bg-[#3D8D7A]/10 text-[#3D8D7A] hover:bg-[#3D8D7A] hover:text-white transition-colors"
                      >
                        <FaGlobe size={13} />
                      </a>
                    )}
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View GitHub Repository"
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-black/50 text-slate-400 dark:text-gray-400 hover:text-[#3D8D7A] transition-colors"
                    >
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-gray-300 text- mb-4 leading-relaxed line-clamp-3">
                  {description}
                </p>

                {/* Topics */}
                {topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {topics.slice(0, 3).map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[14px] px-3.5 py-0.5 rounded-full bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer / Metrics */}
              <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-gray-400 pt-3 border-t border-slate-100 dark:border-white/5 flex-wrap">
                <div className="flex items-center gap-2.5">
                  {/* Primary Language */}
                  {repo.primaryLanguage && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            repo.primaryLanguage.color || "#3D8D7A",
                        }}
                      />
                      <span className="font-medium text-slate-700 dark:text-gray-300">
                        {repo.primaryLanguage.name}
                      </span>
                    </div>
                  )}

                  {/* Stars - Only show if > 0 */}
                  {repo.stargazerCount > 0 && (
                    <div className="flex items-center gap-1 text-amber-500 font-medium">
                      <FaStar size={12} />
                      <span>{repo.stargazerCount}</span>
                    </div>
                  )}

                  {/* Forks - Only show if > 0 */}
                  {repo.forkCount > 0 && (
                    <div className="flex items-center gap-1 font-medium">
                      <FaCodeBranch size={12} />
                      <span>{repo.forkCount}</span>
                    </div>
                  )}

                  {/* Status Badge when stars/forks are 0 */}
                  {repo.stargazerCount === 0 && repo.forkCount === 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#3D8D7A]/10 border border-[#3D8D7A]/20 text-[#3D8D7A] dark:text-[#A3D1C6] font-medium">
                      Public
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-gray-500">
                  {sizeStr && <span>{sizeStr}</span>}
                  {relativeTime && (
                    <span className="flex items-center gap-1">
                      <FaClock size={10} />
                      {relativeTime}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
