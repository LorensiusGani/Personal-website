"use client";

import React, { useEffect, useState, useCallback } from "react";
import ContributionGraph, {
  Week,
  YearActivityGroup,
} from "./ContributionGraph";
import PinnedRepos, { RepoItem } from "./PinnedRepos";
import { FaGithub } from "react-icons/fa";

interface GitHubData {
  username: string;
  year: number;
  availableYears: number[];
  totalContributions: number;
  weeks: Week[];
  activities: YearActivityGroup[];
  pinnedRepos: RepoItem[];
  allRepos?: RepoItem[];
}

function SkeletonGraph() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Mobile/Tablet top tabs skeleton */}
      <div className="flex lg:hidden items-center justify-between gap-3 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#30363D] rounded-xl p-2">
        <div className="h-4 w-10 bg-slate-200 dark:bg-neutral-800 rounded" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-14 bg-slate-200 dark:bg-neutral-800 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-10 space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-48 bg-slate-200 dark:bg-neutral-800 rounded-lg" />
            <div className="h-5 w-32 bg-slate-200 dark:bg-neutral-800 rounded-lg" />
          </div>
          <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#30363D] rounded-xl p-5 h-44" />
        </div>
        <div className="hidden lg:block lg:col-span-2 space-y-2">
          <div className="h-4 w-12 bg-slate-200 dark:bg-neutral-800 rounded mb-2" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-full bg-slate-200 dark:bg-neutral-800 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonRepos() {
  return (
    <div className="mt-10">
      <div className="h-6 w-48 bg-slate-200 dark:bg-neutral-800 rounded-lg mb-6 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#30363D] rounded-2xl p-6 animate-pulse space-y-4"
          >
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-neutral-800 rounded-lg" />
            <div className="h-4 w-full bg-slate-200 dark:bg-neutral-800 rounded-lg" />
            <div className="h-4 w-1/2 bg-slate-200 dark:bg-neutral-800 rounded-lg" />
            <div className="h-4 w-1/3 bg-slate-200 dark:bg-neutral-800 rounded-lg pt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GithubActivity() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [loading, setLoading] = useState(true);
  const [loadingYear, setLoadingYear] = useState(false);
  const [yearCache, setYearCache] = useState<Record<number, GitHubData>>({});

  const handleSelectYear = async (year: number) => {
    if (year === selectedYear) return;
    setSelectedYear(year);

    if (yearCache[year]) {
      setData(yearCache[year]);
      return;
    }

    setLoadingYear(true);
    try {
      const res = await fetch(`/api/github?year=${year}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch year data");
      const json: GitHubData = await res.json();
      setData(json);
      setYearCache((prev) => ({ ...prev, [year]: json }));
    } catch (err) {
      console.error(`Error loading GitHub data for year ${year}:`, err);
    } finally {
      setLoadingYear(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        const res = await fetch("/api/github?year=2026", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch initial year data");
        const json: GitHubData = await res.json();
        if (isMounted) {
          setData(json);
          setSelectedYear(2026);
          setYearCache((prev) => ({ ...prev, [2026]: json }));
        }
      } catch (err) {
        console.error("Error loading initial GitHub activity:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    init();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="github"
      className="
        relative
        bg-slate-50
        dark:bg-[#080C10]
        text-slate-900
        dark:text-white
        py-16
        px-6
        sm:px-10
        lg:px-16
        overflow-hidden
        scroll-mt-20
        transition-colors
        duration-300
      "
    >
      {/* Background Subtle Glows */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#3D8D7A]/10 dark:bg-[#3D8D7A]/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#A3D1C6]/10 dark:bg-[#3D8D7A]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold flex items-center justify-center gap-2">
            <FaGithub size={24} />
            GitHub Activity
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-slate-900 dark:text-white">
            Code & Contributions
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Real-time coding frequency and public repositories highlighting hands-on engineering across open source and personal projects.
          </p>
        </div>

        {/* Dynamic Content */}
        {loading ? (
          <>
            <SkeletonGraph />
            <SkeletonRepos />
          </>
        ) : data ? (
          <>
            <ContributionGraph
              weeks={data.weeks}
              totalContributions={data.totalContributions}
              username={data.username}
              year={selectedYear}
              availableYears={data.availableYears || [2026, 2025, 2024]}
              activities={data.activities || []}
              onSelectYear={handleSelectYear}
              isLoadingYear={loadingYear}
            />
            <PinnedRepos repos={data.pinnedRepos} allRepos={data.allRepos} />
          </>
        ) : (
          <div className="text-center py-12 text-slate-500 dark:text-gray-400">
            Unable to load GitHub activity at this moment.
          </div>
        )}
      </div>
    </section>
  );
}

