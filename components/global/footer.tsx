"use client";
import { useLanguage } from "@/context/languageContext";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const Footer = () => {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".footer-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-divider",
            start: "top 90%",
            once: true,
          },
        }
      );

      const socialLinks =
        socialLinksRef.current?.querySelectorAll(".social-link");
      socialLinks?.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, { y: -5, scale: 1.1, duration: 0.3 });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, { y: 0, scale: 1, duration: 0.3 });
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: <FaTwitter />,
      href: "#",
      label: "Twitter",
      color: "from-blue-400 to-blue-500",
    },
    {
      icon: <FaInstagram />,
      href: "#",
      label: "Instagram",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <FaLinkedinIn />,
      href: "#",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: <FaGithub />,
      href: "#",
      label: "GitHub",
      color: "from-gray-700 to-gray-800",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div className="footer-item col-span-1 lg:col-span-2">
              <div className="flex items-center mb-4">
                <Image
                  src={"/assets/images/logo.webp"}
                  alt="logo"
                  width={50}
                  height={20}
                />{" "}
                <h2 className="text-2xl mr-2 font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {t("footer.brandName")}
                </h2>
              </div>
              <p className="text-gray-400 max-w-md mb-6">
                {t("footer.description")}
              </p>
            </div>

            {/* Links Section */}
            <div className="footer-item">
              <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                {t("footer.linksTitle")}
              </h3>
              <ul className="space-y-3">
                {["Home", "Features", "Pricing", "About", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                      >
                        {t(`footer.links.${item.toLowerCase()}`)}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="footer-item">
              <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                {t("footer.contactTitle")}
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t("footer.email")}
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {t("footer.phone")}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  {t("footer.socialTitle")}
                </h3>
                <div ref={socialLinksRef} className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`social-link w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${social.color} text-white shadow-lg cursor-pointer relative overflow-hidden group`}
                      aria-label={social.label}
                    >
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <span className="relative z-10 text-lg">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent my-8 origin-center" />

          {/* Copyright */}
          <div className="footer-item flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                {t("footer.termsOfService")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        ref={scrollButtonRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
