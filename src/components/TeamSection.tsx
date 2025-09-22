import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { useTeam } from "../hooks/teamHooks/useTeam";

interface TeamSectionProps {
  isDark: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "أحمد محمد",
    role: "مطور رئيسي",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "مطور متكامل مع أكثر من 8 سنوات من الخبرة في بناء تطبيقات الويب القابلة للتوسع.",
    skills: ["React", "Node.js", "Python", "AWS"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    id: 2,
    name: "فاطمة علي",
    role: "مصممة واجهات المستخدم",
    image:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "مصممة مبدعة متحمسة لإنشاء تجارب مستخدم بديهية وجميلة.",
    skills: ["Figma", "Adobe CC", "النماذج الأولية", "بحوث المستخدم"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    id: 3,
    name: "محمد حسن",
    role: "مهندس DevOps",
    image:
      "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "متخصص في البنية التحتية يركز على الأتمتة والمراقبة والهندسة السحابية.",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    id: 4,
    name: "نور أحمد",
    role: "عالمة بيانات",
    image:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "خبيرة في الذكاء الاصطناعي والتعلم الآلي متخصصة في معالجة اللغات الطبيعية والتحليلات التنبؤية.",
    skills: ["Python", "TensorFlow", "PyTorch", "تحليل البيانات"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    id: 5,
    name: "عمر خالد",
    role: "مطور تطبيقات محمولة",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "متخصص في تطبيقات الهاتف المحمول مع خبرة في التطوير الأصلي ومتعدد المنصات.",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    id: 6,
    name: "سارة محمود",
    role: "مديرة المنتجات",
    image:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "قائدة منتجات استراتيجية مع سجل حافل في إطلاق منتجات رقمية ناجحة.",
    skills: ["استراتيجية المنتج", "Agile", "التحليلات", "بحوث المستخدم"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    id: 7,
    name: "يوسف عبدالله",
    role: "مطور الخادم الخلفي",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "متخصص في الخادم الخلفي يركز على بناء تطبيقات خادم قوية وقابلة للتوسع.",
    skills: ["Java", "Spring Boot", "PostgreSQL", "الخدمات المصغرة"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    id: 8,
    name: "ليلى حسام",
    role: "مهندسة ضمان الجودة",
    image:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "خبيرة ضمان الجودة تضمن أن منتجاتنا تلبي أعلى المعايير.",
    skills: ["أتمتة الاختبار", "Selenium", "Jest", "ضمان الجودة"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
];

const TeamSection: React.FC<TeamSectionProps> = ({ isDark }) => {
  const { data: team, isLoading } = useTeam();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    direction: "rtl",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
      "(min-width: 1280px)": { slidesToScroll: 4 },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      id="team"
      className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            تعرف على
            <span className="text-purple-600 ms-3">فريقنا</span>
          </motion.h2>

          <motion.p
            className={`text-lg max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            يجمع فريقنا المتنوع من الخبراء سنوات من الخبرة والشغف لإنشاء حلول
            رقمية استثنائية.
          </motion.p>
        </motion.div>

        {/* Team Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(teamMembers.length / 4) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index * 4)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      Math.floor(selectedIndex / 4) === index
                        ? "bg-purple-600 scale-125"
                        : isDark
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                )
              )}
            </div>
            <div className="flex space-x-4">
              <motion.button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={`p-3 rounded-full transition-all duration-200 ${
                  canScrollNext
                    ? isDark
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                whileHover={canScrollNext ? { scale: 1.05 } : {}}
                whileTap={canScrollNext ? { scale: 0.95 } : {}}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`p-3 rounded-full transition-all duration-200 ${
                  canScrollPrev
                    ? isDark
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                whileHover={canScrollPrev ? { scale: 1.05 } : {}}
                whileTap={canScrollPrev ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Embla Carousel */}
          <div className="embla overflow-hidden py-4 px-3" ref={emblaRef}>
            <div className="embla__container flex">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                >
                  <motion.div
                    className={`group relative rounded-2xl overflow-hidden h-full ${
                      isDark ? "bg-gray-900" : "bg-white"
                    } shadow-xl hover:shadow-2xl transition-all duration-500`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 4) * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        whileHover={{ scale: 1.1 }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Social Links */}
                      <motion.div
                        className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 0, x: 0 }}
                        transition={{
                          delay: (index % 4) * 0.1 + 0.6,
                          duration: 0.6,
                        }}
                        viewport={{ once: true }}
                      >
                        {member.social.github && (
                          <motion.a
                            href={member.social.github}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                        )}
                        {member.social.linkedin && (
                          <motion.a
                            href={member.social.linkedin}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Linkedin className="w-4 h-4" />
                          </motion.a>
                        )}
                        {member.social.twitter && (
                          <motion.a
                            href={member.social.twitter}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Twitter className="w-4 h-4" />
                          </motion.a>
                        )}
                        {member.social.email && (
                          <motion.a
                            href={`mailto:${member.social.email}`}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Mail className="w-4 h-4" />
                          </motion.a>
                        )}
                      </motion.div>

                      {/* Name & Role */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.h3
                          className="text-white text-xl font-bold mb-1"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: (index % 4) * 0.1 + 0.4,
                            duration: 0.6,
                          }}
                          viewport={{ once: true }}
                        >
                          {member.name}
                        </motion.h3>
                        <motion.p
                          className="text-purple-300 font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: (index % 4) * 0.1 + 0.5,
                            duration: 0.6,
                          }}
                          viewport={{ once: true }}
                        >
                          {member.role}
                        </motion.p>
                      </div>
                    </div>

                    {/* Content */}
                    <motion.div
                      className="p-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{
                        delay: (index % 4) * 0.1 + 0.6,
                        duration: 0.6,
                      }}
                      viewport={{ once: true }}
                    >
                      <p
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-600"
                        } mb-4 text-sm leading-relaxed`}
                      >
                        {member.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            className={`px-3 py-1 text-xs rounded-full ${
                              isDark
                                ? "bg-purple-600/20 text-purple-300"
                                : "bg-purple-100 text-purple-600"
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 rounded-full bg-purple-600/10 -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
