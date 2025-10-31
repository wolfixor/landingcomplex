import { useLanguage } from "@/context/languageContext";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaRocket,
  FaPalette,
  FaMobileAlt,
  FaSearch,
   FaShieldAlt,
  FaRobot,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const getFeaturesList = (t: (key: string) => string) => [
  {
    icon: <FaRocket />,
    title: t("features.speed.title"),
    description: t("features.speed.description"),
    color: "from-blue-500 to-indigo-600",
    iconColor: "text-blue-500",
    accentColor: "#4F46E5",
    image: "/assets/images/speed.jpg",
  },
  {
    icon: <FaPalette />,
    title: t("features.design.title"),
    description: t("features.design.description"),
    color: "from-purple-500 to-indigo-600",
    iconColor: "text-purple-500",
    accentColor: "#8B5CF6",
    image: "/assets/images/design.jpg",
  },
  {
    icon: <FaMobileAlt />,
    title: t("features.responsive.title"),
    description: t("features.responsive.description"),
    color: "from-pink-500 to-purple-600",
    iconColor: "text-pink-500",
    accentColor: "#D946EF",
    image: "/assets/images/responsive.jpg",
  },
  {
    icon: <FaSearch />,
    title: t("features.seo.title"),
    description: t("features.seo.description"),
    color: "from-orange-500 to-pink-600",
    iconColor: "text-orange-500",
    accentColor: "#F43F5E",
    image: "/assets/images/seo.jpg",
  },
  {
    icon: <FaRobot />,
    title: t("features.analytics.title"),
    description: t("features.analytics.description"),
    color: "from-green-500 to-teal-600",
    iconColor: "text-green-500",
    accentColor: "#10B981",
    image: "/assets/images/data.jpg",
  },
  {
    icon: <FaShieldAlt />,
    title: t("features.security.title"),
    description: t("features.security.description"),
    color: "from-red-500 to-orange-600",
    iconColor: "text-red-500",
    accentColor: "#F97316",
    image: "/assets/images/security.jpg",
  },
];

const Features = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featuresList = getFeaturesList(t);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Divider animation
      gsap.fromTo(
        dividerRef.current,
        { width: 0, opacity: 0 },
        {
          width: 80,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    if (isHovering) {
      setHoveredIndex(index);
      gsap.to(card, {
        y: -12,
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });

      const image = card.querySelector(".feature-image");
      if (image) {
        gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" });
      }

      const icon = card.querySelector(".feature-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.1,
          rotation: 5,
          duration: 0.4,
          ease: "back.out(1.5)",
        });
      }
    } else {
      setHoveredIndex(null);
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.05)",
        duration: 0.4,
        ease: "power2.out",
      });

      const image = card.querySelector(".feature-image");
      if (image) {
        gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
      }

      const icon = card.querySelector(".feature-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.05) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          >
            {t("features.title")}
          </h2>

          <div
            ref={dividerRef}
            className="h-1.5 w-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto my-6 rounded-full"
          />

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              className="group h-full cursor-pointer"
            >
              <div className="h-full rounded-2xl overflow-hidden relative shadow-lg">
                {/* Background image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <div className="feature-image absolute inset-0 w-full h-full">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} transition-opacity duration-500`}
                    style={{ opacity: hoveredIndex === index ? 0.75 : 0.85 }}
                  />

                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 bg-black/40 transition-opacity duration-500"
                    style={{ opacity: hoveredIndex === index ? 0.3 : 0.5 }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={`feature-icon w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${feature.iconColor} bg-white/90 backdrop-blur-sm shadow-lg`}
                  >
                    <div className="text-2xl">{feature.icon}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-100 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
