import { useLanguage } from "@/context/languageContext";
import { useState, useEffect, useRef } from "react";
import {   FaPaperPlane, FaRocket, FaArrowLeft } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const CTA = () => {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(blob1Ref.current, {
        x: 50,
        y: 50,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        x: -50,
        y: -50,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        badgeRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        newsletterRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const handlePrimaryHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
      duration: 0.3,
    });
  };

  const handlePrimaryLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      duration: 0.3,
    });
  };

  

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700" />

      {/* Animated blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-16">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-2 rounded-full text-white text-sm font-semibold mb-6"
          >
            <FaRocket />
            <span>{t("cta.badge")}</span>
          </div>

          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight"
          >
            {t("cta.title")}
          </h2>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12"
          >
            {t("cta.subtitle")}
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row justify-center items-center gap-5"
          >
            <Link
              href={"https://dashboard.wolfixsite.shop/"}
              target="_blank"
            >
              {" "}
              <button
                onMouseEnter={handlePrimaryHover}
                onMouseLeave={handlePrimaryLeave}
                className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-lg flex items-center gap-2"
              >
                <span>{t("cta.buttons.primary")}</span>
                <FaArrowLeft className="text-sm" />
              </button>
            </Link>
          </div>
        </div>

        <div
          ref={newsletterRef}
          className="mt-20 backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-10 max-w-4xl mx-auto border border-white/20 shadow-xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            {t("cta.newsletter.title")}
          </h3>
          <p className="mb-8 text-white/90">{t("cta.newsletter.subtitle")}</p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("cta.newsletter.placeholder")}
                  className={`w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder:text-white/60 focus:outline-none border border-white/40 focus:ring-2 focus:ring-white/50 ${
                    isRTL ? "text-right pr-12" : "text-left pl-12"
                  }`}
                  required
                />
                <div
                  className={`absolute ${
                    isRTL ? "right-4" : "left-4"
                  } top-1/2 -translate-y-1/2 text-white/60`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-70"
              >
                {isSubmitted ? (
                  <span>{t("cta.newsletter.success")}</span>
                ) : (
                  <>
                    <span>{t("cta.newsletter.button")}</span>
                    <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>
            </div>

            {isSubmitted && (
              <p className="text-green-300 mt-3 text-sm">
                {t("cta.newsletter.successMessage")}
              </p>
            )}
          </form>

          <p className="text-xs text-white/60 mt-6">
            {t("cta.newsletter.privacy")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
