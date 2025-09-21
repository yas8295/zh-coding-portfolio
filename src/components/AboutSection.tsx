import React from "react";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { Code, Zap, Users, Target } from "lucide-react";

interface AboutSectionProps {
  isDark: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isDark }) => {
  const stats = [
    { icon: Code, number: "٢٠٠+", label: "مشروع مكتمل بنجاح" },
    { icon: Users, number: "١٠٠+", label: "عميل راضٍ ومتميز" },
    { icon: Zap, number: "٨+", label: "سنوات من الخبرة" },
    { icon: Target, number: "٩٩%", label: "معدل نجاح المشاريع" },
  ];

  return (
    <section
      id="about"
      className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
              من <span className="text-purple-600 ms-3">نحن</span>
            </motion.h2>

            <motion.p
              className={`text-lg mb-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              } leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              نحن شركة متخصصة في تطوير الحلول البرمجية الشاملة، تضم فريقاً من
              الخبراء في مجالات هندسة البرمجيات، تصميم الواجهات وتجربة المستخدم،
              وتطوير الأنظمة المعقدة. نلتزم بتقديم خدمات عالية الجودة وفق أفضل
              الممارسات العالمية لضمان نجاح عملائنا وتحقيق أهدافهم الاستراتيجية.
            </motion.p>

            <motion.p
              className={`text-lg mb-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              } leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              تمتد خبراتنا لتشمل تطوير المواقع الإلكترونية والتطبيقات الذكية،
              بناء الأنظمة الخلفية المتقدمة، تطوير تطبيقات الهاتف المحمول،
              إضافةً إلى توفير حلول تعتمد على الذكاء الاصطناعي والبنية السحابية.
              نسعى دائماً لتقديم حلول مبتكرة وموثوقة تساهم في تعزيز الكفاءة
              التشغيلية وتمكين المؤسسات من مواكبة التحول الرقمي بثقة وفاعلية.
            </motion.p>
          </motion.div>

          {/* Image with Parallax */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Parallax translateY={[-20, 20]} className="relative z-10">
              <div
                className={`rounded-2xl overflow-hidden shadow-2xl ${
                  isDark ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <img
                  src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our team working"
                  className="w-full h-96 object-cover"
                />
              </div>
            </Parallax>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 bg-purple-600 rounded-full opacity-20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-500 rounded-full opacity-20"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? "bg-purple-600/20" : "bg-purple-100"
                }`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon
                  className={`w-8 h-8 ${
                    isDark ? "text-purple-400" : "text-purple-600"
                  }`}
                />
              </motion.div>
              <motion.div
                className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <div
                className={`text-center ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } font-medium`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
