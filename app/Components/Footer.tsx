import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer
      className="
        relative
        bg-slate-100
        dark:bg-[#050505]
        text-slate-900
        dark:text-white
        pt-20
        pb-8
        px-6
        md:px-12
        overflow-hidden
        border-t
        border-slate-200
        dark:border-[#3D8D7A]/20
        transition-colors
        duration-300
      "
    >
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 md:h-96 h-80 bg-[#3D8D7A]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Lorensius Bernard Gani<span className="text-[#3D8D7A]">.</span>
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mt-2">Full Stack Developer</p>

            <div className="flex items-center gap-2.5 text-slate-600 dark:text-gray-400 mt-5">
              <FaEnvelope size={20} className="text-[#3D8D7A] shrink-0" />
              <a
                href="mailto:lorensiusgani08@gmail.com"
                className="hover:text-[#3D8D7A] transition-colors"
              >
                lorensiusgani08@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600 dark:text-gray-400 mt-2">
              <FaMapMarkerAlt size={20} className="text-[#3D8D7A] shrink-0" />
              <span>Tangerang, Indonesia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#3D8D7A] uppercase text-base tracking-[2px] font-semibold mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-slate-600 dark:text-gray-300">
              <ul className="space-y-2.5">
                <li>
                  <Link href="#home" className="hover:text-[#3D8D7A] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-[#3D8D7A] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#portfolio"
                    className="hover:text-[#3D8D7A] transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="#github"
                    className="hover:text-[#3D8D7A] transition-colors"
                  >
                    Activity
                  </Link>
                </li>
                <li>
                  <Link
                    href="#skills"
                    className="hover:text-[#3D8D7A] transition-colors"
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="hover:text-[#3D8D7A] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#3D8D7A] uppercase text-base tracking-[2px] font-semibold mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/lorensius-bernard-gani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-white
                  dark:bg-black
                  border
                  border-slate-200
                  dark:border-[#3D8D7A]/20
                  text-slate-800
                  dark:text-white
                  hover:text-[#3D8D7A]
                  dark:hover:text-[#3D8D7A]
                  hover:border-[#3D8D7A]/50
                  shadow-sm
                  transition-all
                "
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://github.com/LorensiusGani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-white
                  dark:bg-black
                  border
                  border-slate-200
                  dark:border-[#3D8D7A]/20
                  text-slate-800
                  dark:text-white
                  hover:text-[#3D8D7A]
                  dark:hover:text-[#3D8D7A]
                  hover:border-[#3D8D7A]/50
                  shadow-sm
                  transition-all
                "
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.instagram.com/lorensius.gani/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-white
                  dark:bg-black
                  border
                  border-slate-200
                  dark:border-[#3D8D7A]/20
                  text-slate-800
                  dark:text-white
                  hover:text-[#3D8D7A]
                  dark:hover:text-[#3D8D7A]
                  hover:border-[#3D8D7A]/50
                  shadow-sm
                  transition-all
                "
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 dark:border-[#3D8D7A]/10 pt-6 text-center">
          <p className="text-slate-500 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} Lorensius Bernard Gani. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
