export const seoConfig = {
  fa: {
    title: "سایکو - ساخت وبسایت حرفه‌ای بدون کدنویسی | سایت‌ساز ایرانی",
    description:
      "با سایکو، قدرتمندترین سایت‌ساز ایرانی، در کمتر از 5 دقیقه وبسایت حرفه‌ای خود را بسازید. بدون نیاز به دانش برنامه‌نویسی، با قالب‌های آماده فارسی و پشتیبانی 24/7",
    keywords:
      "سایت ساز ایرانی, ساخت وبسایت, طراحی سایت رایگان, سایت ساز فارسی, ابزار ساخت وبسایت, وب سایت ساز حرفه ای, طراحی سایت بدون کد, قالب آماده فارسی, سایت ساز آنلاین",
    ogTitle: "سایکو - بهترین سایت‌ساز ایرانی برای ساخت وبسایت حرفه‌ای",
    ogDescription:
      "با سایکو در کمتر از 5 دقیقه وبسایت حرفه‌ای خود را بسازید. +10,000 کاربر فعال، قالب‌های آماده فارسی، پشتیبانی 24/7",
    author: "تیم سایکو",
    siteName: "سایکو - سایت‌ساز ایرانی",
  },
  en: {
    title:
      "Psycho - Professional Website Builder Without Coding | Iranian Site Builder",
    description:
      "Build your professional website in less than 5 minutes with Psycho, the most powerful Iranian website builder. No coding required, with ready-made Persian templates and 24/7 support",
    keywords:
      "Iranian website builder, website creation, free website design, Persian site builder, website building tool, professional web builder, no-code website design, ready-made Persian templates, online site builder",
    ogTitle: "Psycho - Best Iranian Website Builder for Professional Websites",
    ogDescription:
      "Build your professional website in less than 5 minutes with Psycho. +10,000 active users, ready-made Persian templates, 24/7 support",
    author: "Psycho Team",
    siteName: "Psycho - Iranian Website Builder",
  },
  ar: {
    title: "سايكو - منشئ مواقع احترافي بدون برمجة | منشئ مواقع إيراني",
    description:
      "قم ببناء موقع الويب الاحترافي الخاص بك في أقل من 5 دقائق مع سايكو، أقوى منشئ مواقع إيراني. لا حاجة للبرمجة، مع قوالب فارسية جاهزة ودعم على مدار الساعة",
    keywords:
      "منشئ مواقع إيراني, إنشاء موقع ويب, تصميم موقع مجاني, منشئ مواقع فارسي, أداة بناء المواقع, منشئ ويب احترافي, تصميم موقع بدون كود, قوالب فارسية جاهزة, منشئ مواقع عبر الإنترنت",
    ogTitle: "سايكو - أفضل منشئ مواقع إيراني للمواقع الاحترافية",
    ogDescription:
      "قم ببناء موقع الويب الاحترافي الخاص بك في أقل من 5 دقائق مع سايكو. +10,000 مستخدم نشط، قوالب فارسية جاهزة، دعم على مدار الساعة",
    author: "فريق سايكو",
    siteName: "سايكو - منشئ مواقع إيراني",
  },
};

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "سایکو",
    alternateName: "Psycho Website Builder",
    url: "https://dashboard.wolfixsite.shop/",
    logo: "https://dashboard.wolfixsite.shop//logo.png",
    description: "قدرتمندترین سایت‌ساز ایرانی برای ساخت وبسایت‌های حرفه‌ای",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+98-21-88776655",
      contactType: "customer service",
      email: "info@psycho.ir",
      availableLanguage: ["fa", "en", "ar"],
    },
    sameAs: [
      "https://twitter.com/psycho",
      "https://instagram.com/psycho",
      "https://linkedin.com/company/psycho",
      "https://github.com/psycho",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IR",
      addressLocality: "تهران",
    },
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "سایکو",
    url: "https://dashboard.wolfixsite.shop/",
    description: "سایت‌ساز حرفه‌ای ایرانی برای ساخت وبسایت بدون کدنویسی",
    inLanguage: ["fa", "en", "ar"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://dashboard.wolfixsite.shop//search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },

  softwareApplication: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "سایکو - سایت‌ساز ایرانی",
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IRR",
      lowPrice: "0",
      highPrice: "2990000",
      offerCount: "3",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "10000",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "ابزار هوشمند برای ساخت وبسایت‌های حرفه‌ای بدون نیاز به دانش برنامه‌نویسی",
    featureList: [
      "ساخت وبسایت بدون کدنویسی",
      "قالب‌های آماده فارسی",
      "پشتیبانی از RTL",
      "بهینه‌سازی SEO",
      "واکنش‌گرا و موبایل فرندلی",
      "پشتیبانی 24/7",
    ],
  },

  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "آیا نیاز به دانش برنامه‌نویسی دارم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "خیر، ابزار ما کاملاً بصری است و نیازی به دانش برنامه‌نویسی ندارید. با استفاده از رابط کاربری ساده ما، می‌توانید به راحتی وبسایت خود را بسازید.",
        },
      },
      {
        "@type": "Question",
        name: "آیا می‌توانم دامنه اختصاصی داشته باشم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بله، شما می‌توانید دامنه اختصاصی خود را به وبسایت متصل کنید. در پلن‌های حرفه‌ای و سازمانی، یک دامنه رایگان نیز ارائه می‌شود.",
        },
      },
      {
        "@type": "Question",
        name: "آیا وبسایت‌های ساخته شده واکنش‌گرا هستند؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بله، تمام وبسایت‌های ساخته شده با ابزار ما کاملاً واکنش‌گرا هستند و در تمامی دستگاه‌ها از جمله موبایل، تبلت و دسکتاپ به خوبی نمایش داده می‌شوند.",
        },
      },
      {
        "@type": "Question",
        name: "آیا می‌توانم بعداً پلن خود را ارتقا دهم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بله، شما می‌توانید در هر زمان پلن خود را ارتقا دهید و از امکانات بیشتر بهره‌مند شوید. تمام داده‌ها و تنظیمات شما حفظ خواهد شد.",
        },
      },
      {
        "@type": "Question",
        name: "چگونه می‌توانم پشتیبانی دریافت کنم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ما پشتیبانی از طریق ایمیل برای تمام کاربران ارائه می‌دهیم. کاربران پلن‌های حرفه‌ای و سازمانی می‌توانند از پشتیبانی 24/7 و چت زنده بهره‌مند شوند.",
        },
      },
    ],
  },

  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "خانه",
        item: "https://dashboard.wolfixsite.shop/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ویژگی‌ها",
        item: "https://dashboard.wolfixsite.shop/#features",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "قیمت‌گذاری",
        item: "https://dashboard.wolfixsite.shop/#pricing",
      },
    ],
  },

  product: {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "سایکو - سایت‌ساز حرفه‌ای",
    description: "ابزار هوشمند برای ساخت وبسایت‌های حرفه‌ای بدون کدنویسی",
    brand: {
      "@type": "Brand",
      name: "سایکو",
    },
    offers: [
      {
        "@type": "Offer",
        name: "پلن رایگان",
        price: "0",
        priceCurrency: "IRR",
        availability: "https://schema.org/InStock",
        url: "https://dashboard.wolfixsite.shop/#pricing",
      },
      {
        "@type": "Offer",
        name: "پلن حرفه‌ای",
        price: "990000",
        priceCurrency: "IRR",
        availability: "https://schema.org/InStock",
        url: "https://dashboard.wolfixsite.shop/#pricing",
      },
      {
        "@type": "Offer",
        name: "پلن سازمانی",
        price: "2990000",
        priceCurrency: "IRR",
        availability: "https://schema.org/InStock",
        url: "https://dashboard.wolfixsite.shop/#pricing",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "10000",
    },
  },
};
