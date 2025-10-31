import { useState, useEffect, useRef } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/languageContext";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Testimonials = () => {
  const { t, isRTL } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials = [
    {
      id: 1,
      name: t("testimonials.1.name"),
      role: t("testimonials.1.role"),
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      content: t("testimonials.1.content"),
      rating: 5,
    },
    {
      id: 2,
      name: t("testimonials.2.name"),
      role: t("testimonials.2.role"),
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      content: t("testimonials.2.content"),
      rating: 5,
    },
    {
      id: 3,
      name: t("testimonials.3.name"),
      role: t("testimonials.3.role"),
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      content: t("testimonials.3.content"),
      rating: 4,
    },
    {
      id: 4,
      name: t("testimonials.4.name"),
      role: t("testimonials.4.role"),
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      content: t("testimonials.4.content"),
      rating: 5,
    },
    {
      id: 5,
      name: t("testimonials.5.name"),
      role: t("testimonials.5.role"),
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      content: t("testimonials.5.content"),
      rating: 5,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-white via-indigo-50 to-white relative overflow-hidden"
      style={{ WebkitOverflowScrolling: "touch" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          >
            {t("testimonials.title")}
          </h2>

          <p
            ref={subtitleRef}
            className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Left Gradient Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none scroll-smooth"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
          >
            <div
              className="flex gap-6 pb-4 px-4"
              style={{ width: "max-content" }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-[320px] md:w-[400px] flex-shrink-0 relative transition-all duration-300 hover:shadow-2xl  "
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4">
                    <FaQuoteLeft className="text-3xl text-indigo-100" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Avatar & Info */}
                    <div className="flex flex-col items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-lg opacity-50" />
                        <Image
                          width={80}
                          height={80}
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                        />
                      </div>

                      <div className="text-center">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-indigo-600 font-medium text-sm mb-2">
                          {testimonial.role}
                        </p>
                        <div className="flex justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`${
                                i < testimonial.rating
                                  ? "text-yellow-400"
                                  : "text-gray-200"
                              } w-4 h-4`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-base leading-relaxed text-center">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
