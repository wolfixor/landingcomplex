"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
   FaBars,
  FaTimes,
  FaHome,
  FaLightbulb,
  FaTag,
  FaComments,
  FaUserPlus,
  FaGlobe,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Language, useLanguage } from "@/context/languageContext";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

const Navbar = () => {
  const { language, setLanguage, direction, t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollToPlugin);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      const logoGlow = logoRef.current?.querySelector(".logo-glow");
      if (logoGlow) {
        gsap.to(logoGlow, {
          scale: 1.2,
          opacity: 0.5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, [mounted]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = ["home", "features", "pricing", "testimonials"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
      if (
        langMenuOpen &&
        !target.closest(".lang-menu") &&
        !target.closest(".lang-button")
      ) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, langMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".mobile-nav-item"),
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (langMenuOpen && langMenuRef.current) {
      gsap.fromTo(
        langMenuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    }
  }, [langMenuOpen]);

  const navItems = [
    { id: "home", label: t("nav.home"), icon: <FaHome className="m-2" /> },
    {
      id: "features",
      label: t("nav.features"),
      icon: <FaLightbulb className="m-2" />,
    },
    { id: "pricing", label: t("nav.pricing"), icon: <FaTag className="m-2" /> },
    {
      id: "testimonials",
      label: t("nav.testimonials"),
      icon: <FaComments className="m-2" />,
    },
  ];

  const languages = [
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: element.offsetTop - 80,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div
          className={`${
            scrolled ? "backdrop-blur-lg bg-white/10" : ""
          } transition-all duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div
                  ref={logoRef}
                  className="flex-shrink-0 relative cursor-pointer"
                  onMouseEnter={(e) =>
                    gsap.to(e.currentTarget, {
                      scale: 1.1,
                      rotate: 5,
                      duration: 0.3,
                    })
                  }
                  onMouseLeave={(e) =>
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      rotate: 0,
                      duration: 0.3,
                    })
                  }
                >
                  <div className="logo-glow absolute inset-0 bg-primary/30 rounded-full blur-md" />
                  <Link href="#" className="relative z-10 flex items-center">
                    <Image
                      src={"/assets/images/logo.webp"}
                      alt="logo"
                      width={50}
                      height={20}
                    />{" "}
                    {mounted && (
                      <span
                        className={`${
                          direction === "rtl" ? "mr-2" : "ml-2"
                        } font-bold text-lg ${
                          scrolled ? "text-black" : "text-white"
                        } hidden sm:block`}
                      >
                        {t("brand.name")}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Desktop Navigation */}
                {mounted && (
                  <div className="hidden md:block">
                    <div
                      className={`${
                        direction === "rtl" ? "mr-10" : "ml-10"
                      } flex items-baseline space-x-1 rtl:space-x-reverse`}
                    >
                      {navItems.map((item) => (
                        <div key={item.id} className="relative nav-item">
                          <Link
                            href={`#${item.id}`}
                            className={`px-4 py-2 rounded-lg text-sm ${
                              scrolled ? "text-black" : "text-white"
                            } font-medium flex items-center transition-colors ${
                              activeSection === item.id
                                ? "text-primary"
                                : "hover:text-primary"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.id);
                            }}
                            onMouseEnter={(e) => {
                              gsap.to(e.currentTarget, {
                                scale: 1.05,
                                duration: 0.2,
                              });
                              gsap.to(
                                e.currentTarget.querySelector(".nav-bg"),
                                {
                                  opacity: 1,
                                  scale: 1,
                                  duration: 0.2,
                                }
                              );
                            }}
                            onMouseLeave={(e) => {
                              gsap.to(e.currentTarget, {
                                scale: 1,
                                duration: 0.2,
                              });
                              gsap.to(
                                e.currentTarget.querySelector(".nav-bg"),
                                {
                                  opacity: 0,
                                  scale: 0.9,
                                  duration: 0.2,
                                }
                              );
                            }}
                          >
                            <span className="nav-bg absolute inset-0 bg-primary/10 rounded-lg opacity-0 -z-10" />
                            {item.icon}
                            {item.label}
                          </Link>
                          {activeSection === item.id && (
                            <span className="active-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Language Switcher */}
                {mounted && (
                  <div className="relative">
                    <button
                      className="lang-button flex items-center justify-center p-2.5 rounded-full  backdrop-blur-md text-primary   shadow-sm"
                      onClick={() => setLangMenuOpen(!langMenuOpen)}
                      onMouseEnter={(e) =>
                        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
                      }
                      onMouseLeave={(e) =>
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                      }
                    >
                      <FaGlobe className="h-5 w-5 text-indigo-600" />
                      <span
                        className={`${
                          direction === "rtl" ? "mr-2" : "ml-2"
                        } hidden  sm:inline-block font-medium ${
                          scrolled ? "text-gray-700" : " text-gray-50"
                        }`}
                      >
                        {languages.find((lang) => lang.code === language)?.flag}
                        <span className="ml-1 text-sm hidden md:inline-block">
                          {
                            languages.find((lang) => lang.code === language)
                              ?.name
                          }
                        </span>
                      </span>
                    </button>

                    {langMenuOpen && (
                      <div
                        ref={langMenuRef}
                        className={`lang-menu bg-white/90 backdrop-blur-xl rounded-xl shadow-lg py-2 min-w-[220px] border border-indigo-100/50 z-50 ${
                          isMobile
                            ? "fixed top-20 left-1/2 -translate-x-1/2"
                            : "absolute top-full mt-2 right-0"
                        }`}
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-700 flex items-center">
                            <FaGlobe className="h-4 w-4 text-indigo-500 mr-2" />
                            {t("navbar.selectLanguage")}
                          </p>
                        </div>
                        <div className="py-2">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all ${
                                language === lang.code
                                  ? "bg-indigo-50/80 text-indigo-600"
                                  : "hover:bg-gray-50/80 text-gray-700"
                              }`}
                              onClick={() =>
                                handleLanguageChange(lang.code as Language)
                              }
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 ${
                                    language === lang.code
                                      ? "bg-indigo-100"
                                      : "bg-gray-100"
                                  }`}
                                >
                                  <span className="text-xl">{lang.flag}</span>
                                </div>
                                <span className="font-medium text-sm">
                                  {lang.name}
                                </span>
                              </div>
                              {language === lang.code && (
                                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                  >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                {mounted && (
                  <div className="hidden md:block">
                    <Link
                      href={"https://dashboard.wolfixsite.shop/"}
                      target="_blank"
                    >
                      <button
                        className="bg-gradient-to-r cursor-pointer from-indigo-800 to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center shadow-md group overflow-hidden relative"
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            scale: 1.05,
                            duration: 0.2,
                          });
                          gsap.to(
                            e.currentTarget.querySelector(".cta-overlay"),
                            {
                              x: "100%",
                              duration: 0.6,
                            }
                          );
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                          gsap.to(
                            e.currentTarget.querySelector(".cta-overlay"),
                            {
                              x: "-100%",
                              duration: 0.6,
                            }
                          );
                        }}
                      >
                        <span className="cta-overlay absolute inset-0 bg-gradient-to-r from-indigo-600 to-primary -translate-x-full" />
                        <FaUserPlus
                          className={`${
                            direction === "rtl" ? "ml-2" : "mr-2"
                          } relative z-10`}
                        />
                        <span className="relative z-10">
                          {t("nav.getStarted")}
                        </span>
                      </button>
                    </Link>
                  </div>
                )}

                {/* Mobile menu button */}
                {mounted && (
                  <div className="md:hidden">
                    <button
                      className={`menu-button inline-flex items-center justify-center p-2.5 rounded-full ${scrolled ? "text-black" : "text-white"}  backdrop-blur-md  hover:bg-primary   focus:outline-none transition-colors shadow-sm`}
                      onClick={() => setIsOpen(!isOpen)}
                      onMouseEnter={(e) =>
                        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
                      }
                      onMouseLeave={(e) =>
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                      }
                    >
                      {isOpen ? (
                        <FaTimes className="h-5 w-5" />
                      ) : (
                        <FaBars className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={mobileMenuRef}
            className="mobile-menu md:hidden fixed inset-0 z-[70] pt-20 overflow-hidden"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-purple-700/20 backdrop-blur-lg" />

            <div className="relative z-10 h-full flex flex-col overflow-y-auto px-4 pt-2 pb-6">
              <div className="flex-1">
                {navItems.map((item) => (
                  <div key={item.id} className="mobile-nav-item mb-3">
                    <Link
                      href={`#${item.id}`}
                      className={`flex items-center w-full px-5 py-4 rounded-xl text-base font-medium transition-all ${
                        activeSection === item.id
                          ? "bg-white/10 text-white border border-white/20"
                          : "text-white/80 hover:bg-white/5"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${
                          activeSection === item.id
                            ? "bg-white/20"
                            : "bg-white/10"
                        } flex items-center justify-center ${
                          isRTL ? "ml-3" : "mr-3"
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      {item.label}
                      {activeSection === item.id && (
                        <div
                          className={`${
                            isRTL ? "mr-auto" : "ml-auto"
                          } w-6 h-6 rounded-full bg-white/20 flex items-center justify-center`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href={"https://dashboard.wolfixsite.shop/"}
                  target="_blank"
                >
                  {" "}
                  <button className="w-full bg-white text-indigo-700 py-4 px-5 rounded-xl text-base font-medium flex items-center justify-center mb-4 shadow-lg">
                    <FaUserPlus
                      className={`${direction === "rtl" ? "ml-2" : "mr-2"}`}
                    />
                    {t("nav.getStarted")}
                  </button>
                </Link>

                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() =>
                        handleLanguageChange(lang.code as Language)
                      }
                      className={`flex items-center px-3 py-2 rounded-lg ${
                        language === lang.code
                          ? "bg-white/20 text-white"
                          : "bg-white/10 text-white/80 hover:bg-white/15"
                      } transition-colors`}
                    >
                      <span className="text-lg mr-2">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-center gap-3 mt-6">
                  {[
                    { icon: <FaTwitter />, color: "bg-blue-500" },
                    { icon: <FaInstagram />, color: "bg-pink-600" },
                    { icon: <FaLinkedin />, color: "bg-blue-700" },
                    { icon: <FaGithub />, color: "bg-gray-800" },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`${item.color} text-white p-3 rounded-full`}
                      onMouseEnter={(e) =>
                        gsap.to(e.currentTarget, { y: -5, duration: 0.2 })
                      }
                      onMouseLeave={(e) =>
                        gsap.to(e.currentTarget, { y: 0, duration: 0.2 })
                      }
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
