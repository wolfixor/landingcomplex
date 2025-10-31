import { FaArrowDown, FaCode, FaPalette, FaMobile } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/languageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Enhanced Canvas Animation with Website Builder Theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const codeBlocks: CodeBlock[] = [];
    const mouse = { x: 0, y: 0, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Enhanced Particle with trails
    class Particle {
      x: number = 0;
      y: number = 0;
      baseX: number = 0;
      baseY: number = 0;
      size: number = 0;
      speedY: number = 0;
      speedX: number = 0;
      opacity: number = 0;
      trail: { x: number; y: number; opacity: number }[] = [];
      hue: number = 0;

      constructor() {
        this.reset();
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.hue = Math.random() * 60 + 200; // Blue to purple range
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + 10;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        // Mouse interaction with smooth spring effect
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = mouse.radius;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        } else {
          // Spring back to base position
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }

        // Update base position
        this.baseY -= this.speedY;
        this.baseX += this.speedX;

        // Trail effect
        this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
        if (this.trail.length > 5) this.trail.shift();

        if (this.baseY < -10) this.reset();
        if (this.baseX < 0 || this.baseX > canvas!.width) this.reset();
      }

      draw() {
        // Draw trail
        this.trail.forEach((point, index) => {
          const trailOpacity = (point.opacity * index) / this.trail.length;
          ctx!.fillStyle = `hsla(${this.hue}, 70%, 60%, ${trailOpacity * 0.3})`;
          ctx!.beginPath();
          ctx!.arc(point.x, point.y, this.size * 0.5, 0, Math.PI * 2);
          ctx!.fill();
        });

        // Draw particle with glow
        const gradient = ctx!.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 3
        );
        gradient.addColorStop(
          0,
          `hsla(${this.hue}, 70%, 70%, ${this.opacity})`
        );
        gradient.addColorStop(
          0.5,
          `hsla(${this.hue}, 70%, 50%, ${this.opacity * 0.5})`
        );
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, 30%, 0)`);
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx!.fill();

        // Core
        ctx!.fillStyle = `hsla(${this.hue}, 90%, 80%, ${this.opacity})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Code Block elements (website builder theme)
    class CodeBlock {
      x: number;
      y: number;
      width: number;
      height: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      type: string;
      color: string;
      floatOffset: number;
      floatSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.width = Math.random() * 60 + 40;
        this.height = Math.random() * 40 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.002;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.floatOffset = Math.random() * Math.PI * 2;
        this.floatSpeed = Math.random() * 0.01 + 0.005;

        const types = ["header", "text", "image", "button", "code"];
        this.type = types[Math.floor(Math.random() * types.length)];

        const colors = [
          "rgba(99, 102, 241, ",
          "rgba(139, 92, 246, ",
          "rgba(236, 72, 153, ",
          "rgba(59, 130, 246, ",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.floatOffset += this.floatSpeed;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius * 2) {
          const force = (mouse.radius * 2 - distance) / (mouse.radius * 2);
          this.x -= dx * force * 0.01;
          this.y -= dy * force * 0.01;
        }
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y + Math.sin(this.floatOffset) * 20);
        ctx!.rotate(this.rotation);

        // Shadow
        ctx!.shadowBlur = 20;
        ctx!.shadowColor = this.color + "0.5)";

        // Main shape
        ctx!.fillStyle = this.color + this.opacity + ")";
        ctx!.strokeStyle = this.color + (this.opacity + 0.2) + ")";
        ctx!.lineWidth = 2;

        // Different shapes based on type
        switch (this.type) {
          case "header":
            ctx!.fillRect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height
            );
            ctx!.strokeRect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height
            );
            // Header lines
            ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity * 2})`;
            ctx!.fillRect(
              -this.width / 2 + 5,
              -this.height / 2 + 5,
              this.width * 0.6,
              3
            );
            break;

          case "button":
            ctx!.beginPath();
            const radius = this.height / 2;
            ctx!.roundRect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height,
              radius
            );
            ctx!.fill();
            ctx!.stroke();
            break;

          case "image":
            ctx!.fillRect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height
            );
            // Image placeholder
            ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity * 1.5})`;
            ctx!.beginPath();
            ctx!.arc(0, -5, 8, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.beginPath();
            ctx!.moveTo(-this.width / 2 + 5, this.height / 2);
            ctx!.lineTo(0, 0);
            ctx!.lineTo(this.width / 2 - 5, this.height / 2);
            ctx!.fill();
            break;

          case "code":
            ctx!.fillRect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height
            );
            ctx!.strokeRect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height
            );
            // Code lines
            ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity * 2})`;
            for (let i = 0; i < 3; i++) {
              ctx!.fillRect(
                -this.width / 2 + 5,
                -this.height / 2 + 5 + i * 8,
                Math.random() * (this.width - 20) + 10,
                2
              );
            }
            break;

          default:
            ctx!.fillRect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height
            );
            ctx!.strokeRect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height
            );
        }

        ctx!.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    // Initialize code blocks
    for (let i = 0; i < 12; i++) {
      codeBlocks.push(new CodeBlock());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let orb1Angle = 0;
    let orb2Angle = Math.PI;
    let orb3Angle = Math.PI / 2;

    const animate = () => {
      // Animated gradient background
      const gradient = ctx!.createLinearGradient(
        0,
        0,
        canvas!.width,
        canvas!.height
      );
      gradient.addColorStop(0, "#0a0515");
      gradient.addColorStop(0.5, "#1a0b2e");
      gradient.addColorStop(1, "#160b28");
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Animated orbs with more variation
      orb1Angle += 0.0008;
      orb2Angle += 0.0012;
      orb3Angle += 0.001;

      const orb1X = canvas!.width * 0.2 + Math.cos(orb1Angle) * 150;
      const orb1Y = canvas!.height * 0.3 + Math.sin(orb1Angle) * 80;

      const orb2X = canvas!.width * 0.8 + Math.cos(orb2Angle) * 120;
      const orb2Y = canvas!.height * 0.7 + Math.sin(orb2Angle) * 100;

      const orb3X = canvas!.width * 0.5 + Math.cos(orb3Angle) * 100;
      const orb3Y = canvas!.height * 0.5 + Math.sin(orb3Angle) * 60;

      // Draw orbs with enhanced gradients
      const drawOrb = (
        x: number,
        y: number,
        size: number,
        color1: string,
        color2: string
      ) => {
        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(0.5, color2);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      };

      drawOrb(
        orb1X,
        orb1Y,
        350,
        "rgba(99, 102, 241, 0.4)",
        "rgba(99, 102, 241, 0.1)"
      );
      drawOrb(
        orb2X,
        orb2Y,
        300,
        "rgba(236, 72, 153, 0.35)",
        "rgba(236, 72, 153, 0.08)"
      );
      drawOrb(
        orb3X,
        orb3Y,
        280,
        "rgba(139, 92, 246, 0.3)",
        "rgba(139, 92, 246, 0.06)"
      );

      // Update and draw code blocks
      codeBlocks.forEach((block) => {
        block.update();
        block.draw();
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Enhanced connection lines with gradient
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const gradient = ctx!.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            const opacity = 0.2 * (1 - distance / 150);
            gradient.addColorStop(0, `hsla(${p1.hue}, 70%, 60%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${p2.hue}, 70%, 60%, ${opacity})`);
            ctx!.strokeStyle = gradient;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(p1.x, p1.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Enhanced GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Container fade in
      tl.from(containerRef.current, {
        opacity: 0,
        duration: 0.5,
      });

      // Title characters stagger with 3D effect
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        tl.from(
          chars,
          {
            y: 100,
            rotationX: -90,
            opacity: 0,
            duration: 1,
            stagger: {
              each: 0.03,
              from: "start",
            },
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      }

      // Subtitle with wave effect
      if (subtitleRef.current) {
        const words = subtitleRef.current.querySelectorAll(".word");
        tl.from(
          words,
          {
            y: 50,
            opacity: 0,
            rotationX: -45,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.7"
        );
      }

      // Features icons with bounce
      if (featuresRef.current) {
        tl.from(
          featuresRef.current.children,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=0.5"
        );
      }

      

      // Floating elements
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;
        gsap.from(elements, {
          y: 100,
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 1.2,
          stagger: {
            each: 0.1,
            from: "random",
          },
          ease: "elastic.out(1, 0.5)",
        });

        // Continuous floating animation
        Array.from(elements).forEach((el, i) => {
          gsap.to(el, {
            y: `+=${Math.random() * 30 - 15}`,
            x: `+=${Math.random() * 30 - 15}`,
            rotation: `+=${Math.random() * 10 - 5}`,
            duration: Math.random() * 3 + 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }

      // Arrow bounce with enhanced effect
      gsap.to(arrowRef.current, {
        y: 15,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Scroll trigger for fade out
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(containerRef.current, {
            opacity: 1 - self.progress * 0.5,
            scale: 1 - self.progress * 0.1,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isEntering: boolean
  ) => {
    const button = e.currentTarget;

    if (isEntering) {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });

      // Magnetic effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", () => {
        button.removeEventListener("mousemove", handleMouseMove);
        gsap.to(button, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)",
        });
      });
    }
  };

  // Split subtitle into words
  const subtitleWords = t("hero.subtitle").split(" ");

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden font-vazir"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />

      {/* Floating UI Elements */}
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-[15%] left-[10%] w-16 h-16 bg-indigo-500/20 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
          <FaCode className="text-white/60 text-2xl" />
        </div>
        <div className="absolute top-[25%] right-[15%] w-20 h-20 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
          <FaPalette className="text-white/60 text-3xl" />
        </div>
        <div className="absolute bottom-[20%] left-[15%] w-14 h-14 bg-pink-500/20 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
          <FaMobile className="text-white/60 text-xl" />
        </div>
        <div className="absolute top-[40%] right-[8%] w-24 h-16 bg-blue-500/15 backdrop-blur-sm rounded-lg border border-white/20" />
        <div className="absolute bottom-[30%] right-[20%] w-32 h-12 bg-indigo-500/15 backdrop-blur-sm rounded-full border border-white/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title with char animation */}
        <h1
          ref={titleRef}
          className="text-3xl lg:text-7xl font-bold text-white mb-6 mt-44 leading-tight"
          style={{
            textShadow:
              "0 0 60px rgba(255,255,255,0.3), 0 0 30px rgba(139, 92, 246, 0.5)",
            perspective: "1000px",
          }}
        >
          {t("hero.title")}
        </h1>

        {/* Subtitle with word animation */}
        <p
          ref={subtitleRef}
          className="text-base lg:text-xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed"
        >
          {subtitleWords.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
        >
          <Link href={"https://dashboard.tomakdigitalagency.ir/"} target="_blank">
            <button
              onMouseEnter={(e) => handleButtonHover(e, true)}
              className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t("hero.cta.primary")}
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 rotate-180 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </div>

        {/* Scroll Arrow */}
        <div ref={arrowRef} className="inline-block">
          <a
            href="#features"
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all duration-300 group"
          >
            <FaArrowDown className="h-5 w-5 group-hover:animate-bounce" />
          </a>
        </div>
      </div>

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
};

export default Hero;
