import React from "react";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { Code, TrendingUp, Zap } from "lucide-react";

interface AboutSectionProps {
  isDark: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isDark }) => {
  const services = [
    {
      icon: Code,
      title: "البرمجة والتطوير",
      description:
        "تطوير حلول برمجية متقدمة تشمل المواقع والتطبيقات الذكية والأنظمة الخلفية بأحدث التقنيات",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "التسويق الرقمي",
      description:
        "استراتيجيات تسويقية شاملة تشمل SEO والإعلانات الممولة والوسائط الاجتماعية لزيادة ظهورك",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "أتمتة العمليات",
      description:
        "حلول ذكية توفر الوقت والتكلفة وتزيد من الكفاءة التشغيلية لعملك دون تدخل بشري",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section
      id="about"
      className={`py-24 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
          : "bg-gradient-to-br from-white via-neutral-50 to-neutral-100"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-20 w-72 h-72 bg-primary-500 rounded-full opacity-5 blur-3xl"
          animate={{ y: [-40, 40, -40] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-72 h-72 bg-primary-600 rounded-full opacity-5 blur-3xl"
          animate={{ y: [40, -40, 40] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl"
                whileHover={{ scale: 1.05 }}
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(27, 236, 172, 0.15) 0%, rgba(0, 204, 142, 0.1) 100%)"
                    : "linear-gradient(135deg, rgba(27, 236, 172, 0.12) 0%, rgba(0, 204, 142, 0.08) 100%)",
                  border: isDark
                    ? "1px solid rgba(27, 236, 172, 0.3)"
                    : "1px solid rgba(27, 236, 172, 0.25)",
                }}
              >
                <h1
                  className={`text-md  tracking-wider uppercase ${
                    isDark ? "text-primary-300" : "text-primary-600"
                  }`}
                >
                  من نحن
                </h1>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                className={`text-5xl  leading-tight tracking-tight ${
                  isDark ? "text-white" : "text-neutral-950"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                فريق متخصص في
                <span className="block mt-3 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 bg-clip-text text-transparent animate-none">
                  تحويل الأحلام
                </span>
                <span
                  className={`block mt-2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  لواقع رقمي
                </span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="space-y-6 mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p
                className={`text-lg leading-relaxed font-light ${
                  isDark ? "text-neutral-300" : "text-neutral-700"
                }`}
              >
                نحن شركة متخصصة في تطوير الحلول البرمجية الشاملة، نضم فريقاً من
                الخبراء في مجالات هندسة البرمجيات، تصميم الواجهات وتجربة
                المستخدم، وتطوير الأنظمة المعقدة. نلتزم بتقديم خدمات عالية
                الجودة وفق أفضل الممارسات العالمية.
              </p>

              <p
                className={`text-lg leading-relaxed font-light ${
                  isDark ? "text-neutral-300" : "text-neutral-700"
                }`}
              >
                تمتد خبراتنا لتشمل تطوير المواقع والتطبيقات الذكية، الأنظمة
                الخلفية المتقدمة، تطبيقات الهاتف، أتمتة العمليات، وحلول التسويق
                الرقمي. نسعى دائماً لتقديم حلول مبتكرة تمكّن المؤسسات من مواكبة
                التحول الرقمي بثقة.
              </p>
            </motion.div>
          </motion.div>

          {/* Image with Parallax - Enhanced */}
          <motion.div
            className="relative h-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Parallax translateY={[-30, 30]} className="relative z-10">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Image Container with layered effects */}
                <div
                  className={`relative rounded-3xl overflow-hidden ${
                    isDark
                      ? "bg-gradient-to-br from-neutral-800 to-neutral-900"
                      : "bg-gradient-to-br from-neutral-100 to-neutral-200"
                  }`}
                >
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-5" />

                  <img
                    src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Our team working"
                    className="w-full h-96 object-cover"
                  />

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400" />
                </div>

                {/* Enhanced floating elements */}
                <motion.div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20 blur-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #1becac 0%, #00cc8e 100%)",
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <motion.div
                  className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full opacity-15 blur-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #00cc8e 0%, #1becac 100%)",
                  }}
                  animate={{
                    y: [20, -20, 20],
                    x: [20, -20, 20],
                    scale: [1.1, 0.9, 1.1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                />

                <motion.div
                  className="absolute top-1/3 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl bg-primary-500"
                  animate={{
                    y: [-15, 15, -15],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </Parallax>

            {/* Decorative corner accents */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary-500/30 rounded-full pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary-400/20 rounded-full pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Services - Enhanced with premium design */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Section label */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1
              className={`text-3xl tracking-widest uppercase ${
                isDark ? "text-primary-400" : "text-primary-600"
              }`}
            >
              خدماتنا الرئيسية
            </h1>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -16, transition: { duration: 0.3 } }}
                >
                  <div
                    className={`relative p-8 rounded-2xl group overflow-hidden backdrop-blur-sm h-full ${
                      isDark
                        ? "bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-neutral-700/40 hover:border-primary-500/50"
                        : "bg-gradient-to-br from-white/60 to-neutral-50/60 border border-neutral-200/50 hover:border-primary-400/50"
                    } transition-all duration-400`}
                    style={{
                      boxShadow: isDark
                        ? "0 8px 32px rgba(27, 236, 172, 0.05)"
                        : "0 8px 32px rgba(27, 236, 172, 0.03)",
                    }}
                  >
                    {/* Animated background gradient on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        background: isDark
                          ? "linear-gradient(135deg, rgba(27, 236, 172, 0.08) 0%, rgba(0, 204, 142, 0.04) 100%)"
                          : "linear-gradient(135deg, rgba(27, 236, 172, 0.06) 0%, rgba(0, 204, 142, 0.03) 100%)",
                      }}
                    />

                    {/* Icon Container with gradient background */}
                    <motion.div
                      className={`relative w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br ${service.color} opacity-60 group-hover:opacity-80 transition-all duration-300`}
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.8 }}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${
                          isDark ? "text-white" : "text-neutral-900"
                        }`}
                      />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className={`text-xl  mb-4 relative z-10 text-center ${
                        isDark ? "text-white" : "text-neutral-900"
                      }`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      {service.title}
                    </motion.h3>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed relative z-10 text-center ${
                        isDark ? "text-neutral-400" : "text-neutral-600"
                      } group-hover:text-primary-600 transition-colors duration-300`}
                    >
                      {service.description}
                    </p>

                    {/* Bottom accent line */}
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
