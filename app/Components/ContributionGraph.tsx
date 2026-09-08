"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaChevronDown,
  FaInfoCircle,
} from "react-icons/fa";

export interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
  weekday: number;
}

export interface Week {
  contributionDays: ContributionDay[];
}

export interface ActivityRepoCommit {
  name: string;
  url: string;
  commits: number;
  percentage: number;
}

export interface ActivityItem {
  id: string;
  type: "commit" | "repo" | "pr";
  title: string;
  repos?: ActivityRepoCommit[];
  createdRepos?: Array<{ name: string; url: string; description?: string }>;
}

export interface YearActivityGroup {
  monthYear: string;
  items: ActivityItem[];
}

interface ContributionGraphProps {
  weeks: Week[];
  totalContributions: number;
  username: string;
  year: number;
  availableYears: number[];
  activities?: YearActivityGroup[];
  onSelectYear: (year: number) => void;
  isLoadingYear?: boolean;
}

export default function ContributionGraph({
  weeks,
  totalContributions,
  username,
  year,
  availableYears,
  activities,
  onSelectYear,
  isLoadingYear = false,
}: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    count: number;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);

  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettingsDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date readable e.g. "Sep 8, 2026"
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString + "T00:00:00");
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Generate Month headers accurately across 53 weeks
  const monthLabels = useMemo(() => {
    const labels: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      // Pick first day or middle day of week
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const date = new Date(firstDay.date + "T00:00:00");
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            name: date.toLocaleString("en-US", { month: "short" }),
            weekIndex,
          });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [weeks]);

  // Color scale matching GitHub's official green palette
  const getColorClass = (count: number) => {
    if (count === 0) {
      return "bg-slate-100 dark:bg-[#161b22] border border-slate-200 dark:border-white/5";
    }
    if (count <= 2) {
      return "bg-[#9be9a8] dark:bg-[#0e4429] border border-[#40c463]/30 dark:border-[#006d32]/40";
    }
    if (count <= 4) {
      return "bg-[#40c463] dark:bg-[#006d32] border border-[#30a14e]/40 dark:border-[#26a641]/40";
    }
    if (count <= 6) {
      return "bg-[#30a14e] dark:bg-[#26a641] border border-[#216e39]/40 dark:border-[#39d353]/40";
    }
    return "bg-[#216e39] dark:bg-[#39d353] border border-[#164b3f] dark:border-[#39d353]";
  };

  return (
    <div className="w-full">
      {/* Mobile & Tablet Year Switcher (Visible on < lg) */}
      <div className="flex lg:hidden items-center justify-between gap-3 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#30363D] rounded-xl p-1.5 mb-5 shadow-sm overflow-x-auto custom-scrollbar">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400 pl-2 shrink-0">
          Year
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {availableYears.map((yr) => {
            const isActive = yr === year;
            return (
              <button
                key={yr}
                type="button"
                onClick={() => onSelectYear(yr)}
                disabled={isLoadingYear && isActive}
                className={`
                  px-3
                  sm:px-4
                  py-1.5
                  rounded-lg
                  text-xs
                  sm:text-sm
                  font-semibold
                  transition-all
                  duration-200
                  shrink-0
                  ${
                    isActive
                      ? "bg-[#0969da] dark:bg-[#1f6feb] text-white shadow-sm"
                      : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  }
                `}
              >
                {yr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Heatmap + Activity on Left, Sidebar on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Main Section: Heatmap + Activity (10 cols on lg) */}
        <div className="lg:col-span-10 space-y-6">
          {/* Heatmap Container Box */}
          <div className="relative">
            {/* Header Above Graph: Count & Settings */}
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap sm:flex-nowrap">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>
                  {totalContributions.toLocaleString()} contributions in {year}
                </span>
                {isLoadingYear && (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-[#1f6feb] border-t-transparent rounded-full animate-spin ml-1" />
                )}
              </h3>

              {/* Contribution Settings Dropdown */}
              <div className="relative shrink-0" ref={settingsRef}>
                <button
                  type="button"
                  onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                  className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 py-1 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 transition-colors whitespace-nowrap"
                >
                  Contribution settings <FaChevronDown size={9} />
                </button>

                {showSettingsDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 w-64 p-3 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl z-30 text-xs text-slate-600 dark:text-gray-300 space-y-2.5 animate-in fade-in zoom-in-95">
                    <div className="font-semibold text-slate-900 dark:text-white pb-1.5 border-b border-slate-100 dark:border-white/10">
                      Activity Settings
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Private contributions</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                        Included
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Activity overview</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                        Enabled
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Heatmap Card Box */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#30363D] rounded-xl p-4 sm:p-5 shadow-sm transition-all duration-300">
              {/* Tooltip */}
              {hoveredDay && (
                <div
                  className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-black text-white text-xs font-medium shadow-2xl border border-slate-700 dark:border-white/20 whitespace-nowrap mb-2"
                  style={{
                    left: `${hoveredDay.x}px`,
                    top: `${hoveredDay.y - 8}px`,
                  }}
                >
                  <span className="font-semibold text-[#39d353]">
                    {hoveredDay.count}{" "}
                    {hoveredDay.count === 1 ? "contribution" : "contributions"}
                  </span>{" "}
                  on {formatDate(hoveredDay.date)}
                </div>
              )}

              {/* Scrollable Heatmap Grid */}
              <div className="overflow-x-auto pb-2 custom-scrollbar">
                <div className="min-w-[740px]">
                  {/* Month Labels Row */}
                  <div className="relative h-5 mb-1 text-[11px] text-slate-500 dark:text-gray-400 ml-8 select-none">
                    {monthLabels.map((month, idx) => (
                      <span
                        key={idx}
                        className="absolute"
                        style={{ left: `${month.weekIndex * 13.8}px` }}
                      >
                        {month.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    {/* Weekday Labels Column */}
                    <div className="flex flex-col justify-between text-[10px] text-slate-400 dark:text-gray-500 pr-1 select-none h-[92px]">
                      <span className="h-[10px] leading-[10px]"></span>
                      <span className="h-[10px] leading-[10px]">Mon</span>
                      <span className="h-[10px] leading-[10px]"></span>
                      <span className="h-[10px] leading-[10px]">Wed</span>
                      <span className="h-[10px] leading-[10px]"></span>
                      <span className="h-[10px] leading-[10px]">Fri</span>
                      <span className="h-[10px] leading-[10px]"></span>
                    </div>

                    {/* Heatmap Grid Cells */}
                    <div className="flex gap-[3px]">
                      {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                          {week.contributionDays.map((day, dIdx) => (
                            <div
                              key={dIdx}
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setHoveredDay({
                                  count: day.contributionCount,
                                  date: day.date,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top,
                                });
                              }}
                              onMouseLeave={() => setHoveredDay(null)}
                              className={`
                                w-[10px]
                                h-[10px]
                                rounded-[2px]
                                transition-all
                                duration-150
                                hover:scale-125
                                hover:z-10
                                cursor-pointer
                                ${getColorClass(day.contributionCount)}
                              `}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Heatmap Card Bottom Footer: Link & Legend */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-gray-400 mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setShowLearnModal(true)}
                  className="text-left text-slate-500 dark:text-gray-400 hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline transition-colors"
                >
                  Learn how we count contributions
                </button>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <span>Less</span>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-slate-100 dark:bg-[#161b22] border border-slate-200 dark:border-white/5" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#9be9a8] dark:bg-[#0e4429]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#40c463] dark:bg-[#006d32]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#30a14e] dark:bg-[#26a641]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#216e39] dark:bg-[#39d353]" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Year Selector Tabs (Desktop Only: hidden on < lg) */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="sticky top-24 space-y-1.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-gray-500 px-3 pb-1 block">
              Years
            </span>
            <div className="flex flex-col gap-1.5">
              {availableYears.map((yr) => {
                const isActive = yr === year;
                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => onSelectYear(yr)}
                    disabled={isLoadingYear && isActive}
                    className={`
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                      font-semibold
                      text-left
                      transition-all
                      duration-200
                      w-full
                      ${
                        isActive
                          ? "bg-[#0969da] dark:bg-[#1f6feb] text-white shadow-md"
                          : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-[#161b22]"
                      }
                    `}
                  >
                    {yr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Learn How We Count Contributions Modal */}
      {showLearnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FaInfoCircle className="text-[#0969da] dark:text-[#58a6ff]" />
                How contributions are counted
              </h4>
              <button
                type="button"
                onClick={() => setShowLearnModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600 dark:text-gray-300 space-y-2.5 leading-relaxed">
              <p>
                Contributions count commits to default branches, opening issues,
                proposing pull requests, and submitting reviews across public and
                private repositories on GitHub.
              </p>
              <p>
                The calendar calculates activity starting from January 1 to
                December 31 for the selected year.
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowLearnModal(false)}
                className="px-4 py-2 rounded-xl bg-[#0969da] dark:bg-[#1f6feb] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

