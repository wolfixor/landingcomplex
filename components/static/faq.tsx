import { useLanguage } from "@/context/languageContext";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FAQ = () => {
  const { t, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const faqs = [
    { question: t("faq.1.question"), answer: t("faq.1.answer") },
    { question: t("faq.2.question"), answer: t("faq.2.answer") },
    { question: t("faq.3.question"), answer: t("faq.3.answer") },
    { question: t("faq.4.question"), answer: t("faq.4.answer") },
    { question: t("faq.5.question"), answer: t("faq.5.answer") },
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
        faqItemsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqItemsRef.current[0],
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    const newIndex = activeIndex === index ? null : index;
    setActiveIndex(newIndex);

    const item = faqItemsRef.current[index];
    if (!item) return;

    const answer = item.querySelector(".faq-answer");
    if (!answer) return;

    if (newIndex === index) {
      gsap.to(answer, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-white via-indigo-50 to-white relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4">
            <FaQuestionCircle />
          </div>

          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          >
            {t("faq.title")}
          </h2>

          <p
            ref={subtitleRef}
            className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                faqItemsRef.current[index] = el;
              }}
              className="group"
            >
              <div
                className={`bg-white rounded-2xl flex flex-col justify-between overflow-hidden border-2 transition-all duration-300 ${
                  activeIndex === index
                    ? "border-indigo-500 shadow-lg"
                    : "border-gray-200 hover:border-indigo-300 shadow-md"
                }`}
              >
                {/* Question */}
                <button
                  className={`"w-full p-6 flex items-center justify-between gap-4 ${
                    isRTL ? "text-right" : "text-left"
                  } `}
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg md:text-xl  font-bold text-gray-900 flex-1">
                    {faq.question}
                  </h3>

                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-indigo-600 text-white rotate-180"
                        : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200"
                    }`}
                  >
                    {activeIndex === index ? (
                      <FaMinus className="text-sm" />
                    ) : (
                      <FaPlus className="text-sm" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <div
                  className="faq-answer overflow-hidden"
                  style={{
                    height: activeIndex === index ? "auto" : 0,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-6">
                    <div className="bg-indigo-50 rounded-xl p-4 md:p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 md:mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t("faq.moreQuestions")}
            </h3>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {t("faq.contactUs")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
