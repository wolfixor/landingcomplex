import { FaCheck, FaStar, FaRocket } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/languageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Pricing = () => {
  const { t } = useLanguage();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const pricingPlans = [
    {
      id: "basic",
      name: t("pricing.plans.basic.name"),
      price: { monthly: t("pricing.plans.basic.price.monthly"), yearly: t("pricing.plans.basic.price.yearly") },
      description: t("pricing.plans.basic.description"),
      features: [
        t("pricing.plans.basic.features.websites"),
        t("pricing.plans.basic.features.templates"),
        t("pricing.plans.basic.features.support"),
      ],
      buttonText: t("pricing.plans.basic.buttonText"),
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500",
    },
    {
      id: "pro",
      name: t("pricing.plans.pro.name"),
      price: { monthly: t("pricing.plans.pro.price.monthly"), yearly: t("pricing.plans.pro.price.yearly") },
      description: t("pricing.plans.pro.description"),
      features: [
        t("pricing.plans.pro.features.websites"),
        t("pricing.plans.pro.features.templates"),
        t("pricing.plans.pro.features.support"),
        t("pricing.plans.pro.features.domain"),
        t("pricing.plans.pro.features.noAds"),
        t("pricing.plans.pro.features.seo"),
      ],
      recommended: true,
      buttonText: t("pricing.plans.pro.buttonText"),
      gradient: "from-indigo-500 to-purple-500",
      iconBg: "bg-indigo-500",
    },
    {
      id: "enterprise",
      name: t("pricing.plans.enterprise.name"),
      price: { monthly: t("pricing.plans.enterprise.price.monthly"), yearly: t("pricing.plans.enterprise.price.yearly") },
      description: t("pricing.plans.enterprise.description"),
      features: [
        t("pricing.plans.enterprise.features.websites"),
        t("pricing.plans.enterprise.features.templates"),
        t("pricing.plans.enterprise.features.support"),
        t("pricing.plans.enterprise.features.domain"),
        t("pricing.plans.enterprise.features.noAds"),
        t("pricing.plans.enterprise.features.seo"),
        t("pricing.plans.enterprise.features.analytics"),
        t("pricing.plans.enterprise.features.api"),
      ],
      buttonText: t("pricing.plans.enterprise.buttonText"),
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500",
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
          scrollTrigger: { trigger: titleRef.current, start: "top 80%", once: true },
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
          scrollTrigger: { trigger: subtitleRef.current, start: "top 80%", once: true },
        }
      );

      gsap.fromTo(
        toggleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: toggleRef.current, start: "top 80%", once: true },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 80%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    if (isHovering) {
      gsap.to(card, { y: -10, scale: 1.02, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4">
            <FaRocket />
            <span>{t("pricing.badge")}</span>
          </div>

          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          >
            {t("pricing.title")}
          </h2>

          <p
            ref={subtitleRef}
            className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            {t("pricing.subtitle")}
          </p>

          {/* Billing Toggle */}
          <div
            ref={toggleRef}
            className="inline-flex p-1 bg-white rounded-xl shadow-md border border-gray-200"
          >
            <button
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              {t("pricing.billingToggle.monthly")}
            </button>
            <button
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                billingPeriod === "yearly"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setBillingPeriod("yearly")}
            >
              {t("pricing.billingToggle.yearly")}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer ${plan.recommended ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg">
                    <FaStar className="text-white text-xs" />
                    <span className="text-white text-sm font-bold">{t("pricing.recommended")}</span>
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`h-full rounded-2xl p-8 bg-white shadow-xl border-2 transition-all duration-300 ${
                  selectedPlan === plan.id || plan.recommended
                    ? `border-transparent bg-gradient-to-br ${plan.gradient} bg-clip-padding`
                    : "border-gray-200"
                }`}
              >
                <div className={`h-full rounded-xl ${selectedPlan === plan.id || plan.recommended ? "bg-white p-6" : ""}`}>
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${plan.iconBg} flex items-center justify-center text-white text-2xl mb-6 shadow-lg`}>
                    <FaRocket />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        {plan.price[billingPeriod]}
                      </span>
                      <span className="ml-2 text-gray-500 text-sm">{t("pricing.currency")}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mt-0.5`}>
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      selectedPlan === plan.id || plan.recommended
                        ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-16 text-center space-y-4">
          <p className="text-gray-600">
            {t("pricing.questions")}{" "}
            <a href="#faq" className="text-indigo-600 font-semibold hover:underline">
              {t("pricing.faqLink")}
            </a>
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <FaCheck className="text-green-500" />
            {t("pricing.guarantee")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
