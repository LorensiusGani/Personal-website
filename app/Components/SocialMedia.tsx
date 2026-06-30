import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div
      className="
        hidden
        lg:flex
        fixed
        left-2
        top-1/2
        -translate-y-1/2
        z-50
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          p-3
          rounded-2xl
          bg-[#0D1117]/80
          backdrop-blur-md
          border
          border-[#3D8D7A]/20
          shadow-xl
        "
      >
        <a
          href="https://www.linkedin.com/in/lorensius-bernard-gani"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-gray-300
            hover:text-[#3D8D7A]
            hover:scale-110
            transition
          "
        >
          <FaLinkedin size={28} />
        </a>

        <a
          href="https://github.com/LorensiusGani"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-gray-300
            hover:text-[#3D8D7A]
            hover:scale-110
            transition
          "
        >
          <FaGithub size={28} />
        </a>

        <a
          href="https://www.instagram.com/lorensius.gani/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-gray-300
            hover:text-[#3D8D7A]
            hover:scale-110
            transition
          "
        >
          <FaInstagram size={28} />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
