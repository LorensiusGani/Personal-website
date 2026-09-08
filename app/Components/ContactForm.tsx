"use client";

import React, { useState } from "react";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please write a message with at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus("submitting");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setResponseMsg(data.message || "Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setResponseMsg(err.message);
      } else {
        setResponseMsg("An unexpected error occurred. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setResponseMsg("");
  };

  if (status === "success") {
    return (
      <div className="bg-white dark:bg-[#0D1117] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 text-center shadow-lg transition-all duration-300">
        <div className="w-16 h-16 bg-emerald-500/10 text-[#3D8D7A] rounded-full flex items-center justify-center mx-auto mb-5">
          <FaCheckCircle size={36} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Message Sent!
        </h3>
        <p className="text-slate-600 dark:text-gray-300 mt-2 max-w-md mx-auto text-sm sm:text-base">
          {responseMsg || "Thank you for reaching out. I'll get back to you as soon as possible!"}
        </p>
        <button
          onClick={resetForm}
          className="mt-6 px-6 py-2.5 rounded-xl bg-[#3D8D7A] hover:bg-[#4EA792] text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#3D8D7A]/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm dark:shadow-none transition-colors duration-300"
    >
      {/* Honeypot field (hidden for spam prevention) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
          <FaExclamationCircle size={18} className="shrink-0 mt-0.5" />
          <span>{responseMsg}</span>
        </div>
      )}

      <div className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2"
          >
            Your Name <span className="text-[#3D8D7A]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
              <FaUser size={15} />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Johnson"
              className={`
                w-full
                pl-11
                pr-4
                py-3.5
                rounded-xl
                bg-slate-50
                dark:bg-black/50
                border
                ${errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200 dark:border-white/10 focus:border-[#3D8D7A]"}
                text-slate-900
                dark:text-white
                placeholder-slate-400
                dark:placeholder-gray-600
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-[#3D8D7A]/20
                transition-all
              `}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2"
          >
            Your Email <span className="text-[#3D8D7A]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
              <FaEnvelope size={15} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@company.com"
              className={`
                w-full
                pl-11
                pr-4
                py-3.5
                rounded-xl
                bg-slate-50
                dark:bg-black/50
                border
                ${errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 dark:border-white/10 focus:border-[#3D8D7A]"}
                text-slate-900
                dark:text-white
                placeholder-slate-400
                dark:placeholder-gray-600
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-[#3D8D7A]/20
                transition-all
              `}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Subject Field (Optional) */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2"
          >
            Subject <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project inquiry / Opportunity"
            className="
              w-full
              px-4
              py-3.5
              rounded-xl
              bg-slate-50
              dark:bg-black/50
              border
              border-slate-200
              dark:border-white/10
              focus:border-[#3D8D7A]
              text-slate-900
              dark:text-white
              placeholder-slate-400
              dark:placeholder-gray-600
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[#3D8D7A]/20
              transition-all
            "
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2"
          >
            Message <span className="text-[#3D8D7A]">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3.5 left-4 pointer-events-none text-slate-400 dark:text-gray-500">
              <FaCommentDots size={15} />
            </div>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Hi Lorensius, I'd like to discuss a project..."
              className={`
                w-full
                pl-11
                pr-4
                py-3.5
                rounded-xl
                bg-slate-50
                dark:bg-black/50
                border
                ${errors.message ? "border-red-500 focus:border-red-500" : "border-slate-200 dark:border-white/10 focus:border-[#3D8D7A]"}
                text-slate-900
                dark:text-white
                placeholder-slate-400
                dark:placeholder-gray-600
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-[#3D8D7A]/20
                transition-all
                resize-none
              `}
            />
          </div>
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2.5
            py-4
            px-6
            rounded-xl
            bg-[#3D8D7A]
            hover:bg-[#4EA792]
            disabled:bg-slate-400
            disabled:cursor-not-allowed
            text-white
            font-semibold
            text-base
            transition-all
            duration-200
            shadow-md
            hover:shadow-lg
            cursor-pointer
          "
        >
          {status === "submitting" ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Sending message...</span>
            </>
          ) : (
            <>
              <FaPaperPlane size={15} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
