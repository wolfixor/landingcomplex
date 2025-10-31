import { useLanguage } from "@/context/languageContext";
import { useRef, useEffect } from "react";
import {
  FaRocket,
  FaPencilAlt,
  FaCheckCircle,
 } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const HowItWorks = () => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      icon: <FaRocket />,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
    },
    {
      icon: <FaPencilAlt />,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
      gradient: "from-purple-500 via-pink-500 to-red-500",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500",
    },
    {
      icon: <FaCheckCircle />,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
      gradient: "from-green-500 via-teal-500 to-cyan-500",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Steps stagger animation
      stepsRef.current.forEach((step, index) => {
        if (step) {
          const isMobile = window.innerWidth < 768;
          gsap.fromTo(
            step,
            { x: isMobile ? -50 : index % 2 === 0 ? -100 : 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleStepHover = (index: number, isHovering: boolean) => {
    const step = stepsRef.current[index];
    if (!step) return;

    if (isHovering) {
      gsap.to(step, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });

      const icon = step.querySelector(".step-icon-wrapper");
      if (icon) {
        gsap.to(icon, {
          rotate: 360,
          scale: 1.2,
          duration: 0.6,
          ease: "back.out(1.7)",
        });
      }
    } else {
      gsap.to(step, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      const icon = step.querySelector(".step-icon-wrapper");
      if (icon) {
        gsap.to(icon, {
          rotate: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 w-64 h-64 md:w-96 md:h-96 bg-indigo-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-5 w-64 h-64 md:w-96 md:h-96 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          >
            {t("howItWorks.title")}
          </h2>

          <p
            ref={subtitleRef}
            className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Mobile timeline line (left side) */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 md:hidden" />

          {/* Desktop timeline line (center) */}
          <div
            ref={timelineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-1/2 origin-top hidden md:block"
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepsRef.current[index] = el;
                }}
                className={`flex flex-row md:flex-row items-start md:items-center gap-4 md:gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Mobile Icon (left side) */}
                <div className="relative flex-shrink-0 md:hidden">
                  <div
                    className={`step-icon-wrapper w-12 h-12 rounded-full ${step.iconBg} flex items-center justify-center text-white text-lg shadow-lg relative z-10`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className="flex-1 group cursor-pointer"
                  onMouseEnter={() => handleStepHover(index, true)}
                  onMouseLeave={() => handleStepHover(index, false)}
                >
                  <div
                    className={`${step.bgColor} rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Step number badge */}
                    <div
                      className={`absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg`}
                    >
                      {index + 1}
                    </div>

                    <div className="relative z-10 pr-12">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Icon Circle (center) */}
                <div className="relative flex-shrink-0 hidden md:block">
                  <div
                    className={`step-icon-wrapper w-20 h-20 lg:w-24 lg:h-24 rounded-full ${step.iconBg} flex items-center justify-center text-white text-2xl lg:text-3xl shadow-2xl relative z-10`}
                  >
                    {step.icon}
                  </div>

                  {/* Pulse effect */}
                  <div
                    className={`absolute inset-0 rounded-full ${step.iconBg} opacity-20 animate-ping`}
                    style={{ animationDuration: "2s" }}
                  />
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-24 text-center">
          <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />

            <Link
              href={"https://dashboard.tomakdigitalagency.ir/"}
              target="_blank"
            >
              {" "}
              <button className="relative cursor-pointer px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base md:text-lg font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
                {t("howItWorks.startNow")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
