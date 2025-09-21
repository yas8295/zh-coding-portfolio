import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { toast } from "react-toastify";

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
    [emblaApi]
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
    <section id="home" className="relative h-screen overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container h-screen">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="embla__slide relative flex-[0_0_100%]"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r"
                style={{ background: slide.background }}
              />

              {/* Geometric overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,0 100,0 80,100 0,100"
                    fill="currentColor"
                    className="text-white"
                  />
                  <polygon
                    points="60,0 100,0 100,40 80,0"
                    fill="currentColor"
                    className="text-white opacity-50"
                  />
                </svg>
              </div>

              <div className="relative z-10 flex items-center h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      {selectedIndex === index && (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                          <motion.h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-10 text-right drop-shadow-2xl"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                          >
                            {slide.title}
                          </motion.h1>

                          <motion.div
                            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 h-16 text-right"
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
                            className="text-base md:text-lg text-white/80 mb-8 max-w-2xl text-right leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                          >
                            {slide.description}
                          </motion.p>

                          <a href="#contact">
                            {" "}
                            <motion.button
                              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8, duration: 0.8 }}
                            >
                              {slide.cta}
                            </motion.button>
                          </a>
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

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 space-x-reverse rtl:space-x-reverse">
        <button
          onClick={scrollNext}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="flex space-x-2 space-x-reverse">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        <button
          onClick={scrollPrev}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 me-4"
        >
          <Play
            className={`w-6 h-6 ${isPlaying ? "opacity-100" : "opacity-50"}`}
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
