"use client";

import React from "react";
import ContactForm from "./ContactForm";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="
        relative
        bg-slate-50
        dark:bg-[#080C10]
        text-slate-900
        dark:text-white
        py-20
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
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#3D8D7A]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A3D1C6]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xl md:text-2xl text-[#3D8D7A] tracking-[2px] uppercase font-semibold">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-slate-900 dark:text-white">
            Let&apos;s Work Together
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind, an opportunity to discuss, or just want to connect? Send a message below and I&apos;ll get back to you shortly.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Card */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#3D8D7A]/20 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Available for Opportunities</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Open to Full-time & Project Roles
              </h3>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                Currently exploring software engineering opportunities focused on Full Stack development with React/Next.js, ASP.NET Core, and modern cloud architectures.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#3D8D7A]/20 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3D8D7A]/10 text-[#3D8D7A] flex items-center justify-center shrink-0">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500 block">
                    Email
                  </span>
                  <a
                    href="mailto:lorensiusgani08@gmail.com"
                    className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white hover:text-[#3D8D7A] transition-colors"
                  >
                    lorensiusgani08@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#3D8D7A]/10 text-[#3D8D7A] flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500 block">
                    Location
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">
                    Tangerang, Indonesia
                  </span>
                </div>
              </div>
            </div>

            {/* Social Connect Icons */}
            <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#3D8D7A]/20 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                Social Profiles
              </span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/lorensius-bernard-gani"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:text-[#3D8D7A] dark:hover:text-[#3D8D7A] flex items-center justify-center transition-colors"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://github.com/LorensiusGani"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:text-[#3D8D7A] dark:hover:text-[#3D8D7A] flex items-center justify-center transition-colors"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.instagram.com/lorensius.gani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:text-[#3D8D7A] dark:hover:text-[#3D8D7A] flex items-center justify-center transition-colors"
                >
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
