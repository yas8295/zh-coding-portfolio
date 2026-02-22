import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { toast } from "react-toastify";
import ProjectsMarquee from "./ProjectsMarquee";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  background: string;
}

interface HeroSliderProps {
  isDark: boolean;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "تطوير الواجهات الأمامية",
    subtitle: "تجربة مستخدم سلسة وعصرية",
    description:
      "نصمم ونطور واجهات أمامية تفاعلية باستخدام أحدث تقنيات مثل React و Vue و Angular لنمنح عملاءك تجربة استخدام استثنائية.",
    cta: "ابدأ بناء واجهتك الأمامية",
    background: "linear-gradient(135deg, #c31432 0%, #240b36 100%)",
  },
  {
    id: 2,
    title: "تطوير الأنظمة الخلفية",
    subtitle: "قوة وأداء عالي مع أمان متكامل",
    description:
      "نقوم بتطوير أنظمة خلفية مرنة وقابلة للتوسع باستخدام Node.js, Laravel, Django وغيرها، مع ضمان أمان البيانات وأداء عالي.",
    cta: "تعرف على حلول الباك إند",
    background:
      "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  },
  {
    id: 3,
    title: "تطبيقات الموبايل",
    subtitle: "تجربة غنية على iOS و Android",
    description:
      "نطور تطبيقات موبايل أصلية وهجينة باستخدام Flutter و React Native لتمنح جمهورك تجربة متكاملة على مختلف المنصات.",
    cta: "ابدأ مشروع تطبيقك الآن",
    background: "linear-gradient(135deg, #42275a 0%, #734b6d 100%)",
  },
  {
    id: 4,
    title: "بيع واستضافة السيرفرات",
    subtitle: "بنية تحتية قوية وآمنة لمشاريعك",
    description:
      "نوفر سيرفرات مخصصة وVPS وحلول استضافة موثوقة مع أداء عالي وأمان كامل لضمان استمرارية أعمالك بدون انقطاع.",
    cta: "احجز سيرفرك الآن",
    background: "linear-gradient(135deg, #16222a 0%, #3a6073 100%)",
  },
];

const HeroSlider: React.FC<HeroSliderProps> = ({ isDark }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext(); // Reversed for RTL
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev(); // Reversed for RTL
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !isPlaying) return;

    const interval = setInterval(() => {
      emblaApi.scrollPrev(); // Reversed for RTL
    }, 7000);

    return () => clearInterval(interval);
  }, [emblaApi, isPlaying]);

  return (
    <section
      id="home"
      className="relative overflow-hidden h-screen lg:mt-5 mt-24"
    >
      <div className="embla h-[65%]" ref={emblaRef} id="hero">
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="embla__slide flex-[0_0_100%] relative z-20"
            >
              <div className="relative z-10 flex items-center h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="">
                    <AnimatePresence mode="wait">
                      {selectedIndex === index && (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="text-center"
                        >
                          <motion.div
                            className="mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          >
                            <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold border border-primary-500 dark:text-white">
                              خدمة مميزة
                            </span>
                          </motion.div>

                          <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-center drop-shadow-2xl dark:text-white"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                          >
                            {slide.title}
                          </motion.h1>

                          <motion.div
                            className="text-xl md:text-2xl lg:text-4xl  mb-8 h-auto text-center font-light dark:text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                          >
                            <TypeAnimation
                              sequence={[slide.subtitle, 2000, "", 500]}
                              wrapper="span"
                              speed={50}
                              repeat={Infinity}
                            />
                          </motion.div>

                          <motion.p
                            className="text-lg md:text-xl  mb-10 max-w-2xl mx-auto text-center leading-relaxed font-light dark:text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                          >
                            {slide.description}
                          </motion.p>

                          <div className="flex items-center gap-6 justify-center">
                            <a href="#contact">
                              <motion.button
                                className="relative px-8 py-4 rounded-full font-semibold text-base md:text-lg overflow-hidden group border border-primary-400 bg-gradient-to-l from-primary-800 to-primary-900"
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                              >
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-l from-white to-primary-100 flex items-center justify-center">
                                  {slide.cta}
                                </span>
                              </motion.button>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects marquee (fetched from API) - placed below the embla */}
      <ProjectsMarquee isDark={isDark} />

      {/* Navigation Controls */}
      {/*<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-20">
         <motion.button
          onClick={scrollNext}
          className="p-4 rounded-full transition-all duration-300 dark:bg-primary-300 bg-white text-primary-600 dark:text-black"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.1), inset 0 -2px 10px rgba(255,255,255,0.1)",
          }}
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button> */}

      {/* Indicator dots with enhanced styling */}
      {/* <div className="flex gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-10 h-3 dark:bg-primary-400 bg-primary-600"
                  : "w-3 h-3 bg-white"
              }`}
              whileHover={{
                scale: index === selectedIndex ? 1 : 1.3,
                boxShadow: "0 0 15px rgba(255,255,255,0.5)",
              }}
              animate={
                index === selectedIndex ? { opacity: [0.8, 1, 0.8] } : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </div> */}

      {/* <motion.button
          onClick={scrollPrev}
          className="p-4 rounded-full transition-all duration-300 dark:bg-primary-300 bg-white text-primary-600 dark:text-black"
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.1), inset 0 -2px 10px rgba(255,255,255,0.1)",
          }}
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.button>

        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full transition-all duration-300 ms-4 "
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: isPlaying
              ? "linear-gradient(135deg, #63ffcf, #136b50)"
              : "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: isPlaying
              ? "0 0 20px rgba(59, 130, 246, 0.5)"
              : "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <motion.div
            animate={isPlaying ? { rotate: [0, 360] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Play className={`w-5 h-5 ${isPlaying ? "fill-white" : ""}`} />
          </motion.div>
        </motion.button> 
      </div>*/}
    </section>
  );
};

export default HeroSlider;
