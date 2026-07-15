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
        bg-[#050505]
        text-white
        pt-20
        pb-8
        px-6
        md:px-12
        overflow-hidden
        border-t
        border-[#3D8D7A]/20
      "
    >
      {/* Glow */}
      <div className="absolute top-0 left-1/2  w-96 md:h-96 h-80 bg-[#3D8D7A]/10 blur-[160px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* CTA */}
        {/* <div
          className="
            bg-[#0D1117]
            border
            border-[#3D8D7A]/20
            rounded-3xl
            p-10
            md:p-14
            text-center
            mb-16
          "
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Have a project in mind or just want to connect? Feel free to reach
            out — I&apos;m always open to discussing new opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:lorensius@email.com"
              className="
                px-6
                py-3
                rounded-full
                bg-[#3D8D7A]
                text-white
                font-semibold
                hover:bg-[#357566]
                transition
              "
            >
              Email Me
            </a>

            <a
              href="/Assets/Resume.pdf"
              target="_blank"
              className="
                px-6
                py-3
                rounded-full
                border
                border-[#3D8D7A]/40
                text-white
                font-semibold
                hover:bg-[#3D8D7A]/10
                transition
              "
            >
              Download CV
            </a>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold">
              Lorensius Bernard Gani<span className="text-[#3D8D7A]">.</span>
            </h3>
            <p className="text-gray-400 mt-2">Full Stack Developer</p>

            <div className="flex items-center gap-2 text-gray-400 mt-5">
              <FaEnvelope size={28} className="text-[#3D8D7A]" />
              <span>lorensiusgani08@gmail.com</span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <FaMapMarkerAlt size={28} className="text-[#3D8D7A]" />
              <span>Tangerang, Indonesia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#3D8D7A] uppercase text-base tracking-[2px] font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#home" className="hover:text-[#3D8D7A] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#3D8D7A] transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="hover:text-[#3D8D7A] transition"
                >
                  Portfolio
                </Link>
              </li>
              {/* <li>
                <Link
                  href="mailto:lorensius@email.com"
                  className="hover:text-[#3D8D7A] transition"
                >
                  Contact
                </Link>
              </li> */}
            </ul>
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
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-black
                  border border-[#3D8D7A]/20
                  hover:bg-[#3D8D7A]/10
                  transition
                "
              >
                <FaLinkedin size={32} />
              </a>

              <a
                href="https://github.com/LorensiusGani"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-black
                  border border-[#3D8D7A]/20
                  hover:bg-[#3D8D7A]/10
                  transition
                "
              >
                <FaGithub size={32} />
              </a>

              <a
                href="https://www.instagram.com/lorensius.gani/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-black
                  border border-[#3D8D7A]/20
                  hover:bg-[#3D8D7A]/10
                  transition
                "
              >
                <FaInstagram size={32} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#3D8D7A]/10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Lorensius Bernard Gani. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
