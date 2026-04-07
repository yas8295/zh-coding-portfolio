import React from "react";
import { motion } from "framer-motion";
import { Code, Server, Smartphone, Megaphone, Brain } from "lucide-react";

interface CoursesSectionProps {
  isDark: boolean;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ isDark }) => {
  const courses = [
    {
      icon: Code,
      title: "دورة تطوير الواجهات الأمامية (Frontend)",
      description:
        "تعلم بناء واجهات مستخدم تفاعلية وعصرية باستخدام React و Next.js.",
      tags: ["React", "Next.js", "TypeScript", "TailwindCSS"],
      gradient: "from-primary-500 to-primary-500",
    },
    {
      icon: Server,
      title: "دورة تطوير الأنظمة الخلفية (Backend) - Laravel",
      description:
        "اكتسب مهارات بناء تطبيقات ويب قوية وقابلة للتطوير باستخدام إطار العمل Laravel.",
      tags: ["PHP", "Laravel", "MySQL", "APIs"],
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Server,
      title: "دورة تطوير الأنظمة الخلفية (Backend) - Django",
      description:
        "تعمق في تطوير الويب باستخدام Python و Django لبناء تطبيقات آمنة وفعالة.",
      tags: ["Python", "Django", "PostgreSQL", "REST API"],
      gradient: "from-primary-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "دورة تطوير تطبيقات الموبايل (Flutter)",
      description:
        "طور تطبيقات جميلة وعالية الأداء لمنصتي iOS و Android من قاعدة كود واحدة.",
      tags: ["Flutter", "Dart", "Firebase", "Mobile UI/UX"],
      gradient: "from-sky-500 to-primary-500",
    },
    {
      icon: Megaphone,
      title: "دورة التسويق الإلكتروني",
      description:
        "تعلم استراتيجيات التسويق الرقمي الفعالة لزيادة الوعي بعلامتك التجارية وتحقيق النمو.",
      tags: ["SEO", "Social Media", "Content Marketing", "Google Ads"],
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section id="courses" className={`py-20 ${isDark ? "" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl md:text-5xl mb-6 ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            دوراتنا <span className="text-primary-600">التدريبية</span>
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              isDark ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            انضم إلى دوراتنا المتخصصة والمصممة لتزويدك بالمهارات العملية التي
            يحتاجها سوق العمل اليوم.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className={`relative group rounded-2xl p-8 overflow-hidden transition-all duration-500 ${
                isDark
                  ? "bg-neutral-800/60 hover:bg-neutral-700"
                  : "bg-neutral-50 hover:bg-white"
              } border ${
                isDark ? "border-neutral-700" : "border-neutral-200"
              } hover:shadow-2xl hover:border-primary-500/50`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ${course.gradient}`}
              />
              <div className="relative z-10">
                <course.icon
                  className={`w-12 h-12 mb-6 ${
                    isDark ? "text-primary-400" : "text-primary-600"
                  }`}
                />
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {course.title}
                </h3>
                <p
                  className={`mb-6 ${
                    isDark ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-xs rounded-full ${
                        isDark
                          ? "bg-primary-600/20 text-primary-300"
                          : "bg-primary-100 text-primary-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
