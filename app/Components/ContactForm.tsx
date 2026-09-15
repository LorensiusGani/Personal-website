"use client";

import React, { useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaClock,
} from "react-icons/fa";
import {
  containsProfanity,
  isSpamContent,
  isDisposableEmail,
} from "@/app/lib/security";

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
  subject?: string;
  message?: string;
}

const COOLDOWN_DURATION = 45; // 45 seconds cooldown after message is sent

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
  const [loadTimestamp, setLoadTimestamp] = useState<number>(0);
  const [cooldown, setCooldown] = useState<number>(0);

  // Set form load timestamp on mount for bot time-trap verification
  useEffect(() => {
    setLoadTimestamp(Date.now());
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Name Validation & Profanity Check
    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      newErrors.name = "Mohon masukkan nama Anda (minimal 2 karakter).";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Nama tidak boleh melebihi 100 karakter.";
    } else if (containsProfanity(trimmedName).hasProfanity) {
      newErrors.name = "Nama mengandung kata-kata yang tidak pantas.";
    }

    // 2. Email Validation & Disposable Filter
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email = "Mohon masukkan alamat email yang valid.";
    } else if (isDisposableEmail(trimmedEmail)) {
      newErrors.email = "Mohon gunakan email pribadi/bisnis yang valid (bukan temporary email).";
    }

    // 3. Subject Profanity Check (if provided)
    const trimmedSubject = formData.subject.trim();
    if (trimmedSubject) {
      if (trimmedSubject.length > 150) {
        newErrors.subject = "Subjek tidak boleh melebihi 150 karakter.";
      } else if (containsProfanity(trimmedSubject).hasProfanity) {
        newErrors.subject = "Subjek mengandung kata-kata yang tidak pantas.";
      }
    }

    // 4. Message Validation, Profanity & Spam Check
    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage || trimmedMessage.length < 10) {
      newErrors.message = "Mohon tulis pesan dengan minimal 10 karakter.";
    } else if (trimmedMessage.length > 2000) {
      newErrors.message = "Pesan terlalu panjang (maksimal 2000 karakter).";
    } else if (containsProfanity(trimmedMessage).hasProfanity) {
      newErrors.message = "Pesan mengandung kata-kata yang tidak pantas. Mohon gunakan bahasa yang sopan dan profesional.";
    } else {
      const spamCheck = isSpamContent(trimmedMessage, trimmedSubject);
      if (spamCheck.isSpam) {
        newErrors.message = spamCheck.reason || "Pesan terdeteksi sebagai spam.";
      }
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

    // Check cooldown
    if (cooldown > 0) {
      setResponseMsg(`Mohon tunggu ${cooldown} detik sebelum mengirim pesan lagi.`);
      setStatus("error");
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus("submitting");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: loadTimestamp,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim pesan.");
      }

      setStatus("success");
      setResponseMsg(data.message || "Pesan Anda berhasil dikirim!");
      setCooldown(COOLDOWN_DURATION);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
      // Refresh load timestamp for subsequent attempts
      setLoadTimestamp(Date.now());
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setResponseMsg(err.message);
      } else {
        setResponseMsg("Terjadi kesalahan yang tidak terduga. Silakan coba lagi.");
      }
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setResponseMsg("");
    setErrors({});
  };

  if (status === "success") {
    return (
      <div className="bg-white dark:bg-[#0D1117] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 text-center shadow-lg transition-all duration-300">
        <div className="w-16 h-16 bg-emerald-500/10 text-[#3D8D7A] rounded-full flex items-center justify-center mx-auto mb-5">
          <FaCheckCircle size={36} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Pesan Terkirim!
        </h3>
        <p className="text-slate-600 dark:text-gray-300 mt-2 max-w-md mx-auto text-sm sm:text-base">
          {responseMsg || "Terima kasih telah menghubungi. Saya akan membalas pesan Anda secepat mungkin!"}
        </p>

        {cooldown > 0 ? (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-black/40 py-2.5 px-4 rounded-xl max-w-xs mx-auto">
            <FaClock size={14} className="text-[#3D8D7A] animate-pulse" />
            <span>Kirim pesan lagi dalam <strong>{cooldown} detik</strong></span>
          </div>
        ) : (
          <button
            onClick={resetForm}
            className="mt-6 px-6 py-2.5 rounded-xl bg-[#3D8D7A] hover:bg-[#4EA792] text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Kirim Pesan Lain
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#3D8D7A]/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm dark:shadow-none transition-colors duration-300"
    >
      {/* Honeypot field (hidden for spam bots) */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
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
            Nama Lengkap <span className="text-[#3D8D7A]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
              <FaUser size={15} />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              maxLength={100}
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
                ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-200 dark:border-white/10 focus:border-[#3D8D7A]"
                }
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
            Alamat Email <span className="text-[#3D8D7A]">*</span>
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
                ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-200 dark:border-white/10 focus:border-[#3D8D7A]"
                }
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
            Subjek <span className="text-slate-400 text-[10px] font-normal">(Opsional)</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            maxLength={150}
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project inquiry / Peluang Kerjasama"
            className={`
              w-full
              px-4
              py-3.5
              rounded-xl
              bg-slate-50
              dark:bg-black/50
              border
              ${
                errors.subject
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-200 dark:border-white/10 focus:border-[#3D8D7A]"
              }
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
          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-gray-300"
            >
              Pesan <span className="text-[#3D8D7A]">*</span>
            </label>
            <span
              className={`text-[11px] ${
                formData.message.length > 1800
                  ? "text-amber-500 font-semibold"
                  : "text-slate-400 dark:text-gray-500"
              }`}
            >
              {formData.message.length} / 2000
            </span>
          </div>
          <div className="relative">
            <div className="absolute top-3.5 left-4 pointer-events-none text-slate-400 dark:text-gray-500">
              <FaCommentDots size={15} />
            </div>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={2000}
              value={formData.message}
              onChange={handleChange}
              placeholder="Halo Lorensius, saya ingin mendiskusikan project..."
              className={`
                w-full
                pl-11
                pr-4
                py-3.5
                rounded-xl
                bg-slate-50
                dark:bg-black/50
                border
                ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-200 dark:border-white/10 focus:border-[#3D8D7A]"
                }
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
          disabled={status === "submitting" || cooldown > 0}
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
            dark:disabled:bg-slate-700
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
              <span>Mengirim pesan...</span>
            </>
          ) : cooldown > 0 ? (
            <>
              <FaClock size={15} />
              <span>Tunggu {cooldown} detik</span>
            </>
          ) : (
            <>
              <FaPaperPlane size={15} />
              <span>Kirim Pesan</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
