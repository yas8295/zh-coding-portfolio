import React from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import {
  Code,
  Smartphone,
  Cloud,
  Brain,
  Database,
  Shield,
  ArrowRight,
} from "lucide-react";

interface ServicesSectionProps {
  isDark: boolean;
}

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

const services: Service[] = [
  {
    icon: Code,
    title: "تطوير المواقع الإلكترونية",
    description: "تطبيقات ويب حديثة ومتجاوبة مبنية بأحدث التقنيات العالمية.",
    features: [
      "React/Next.js",
      "TypeScript",
      "Tailwind CSS",
      "تطبيقات الويب التقدمية",
    ],
    gradient: "from-purple-500 to-blue-600",
  },
  {
    icon: Smartphone,
    title: "تطوير التطبيقات المحمولة",
    description: "تطبيقات محمولة أصلية ومتعددة المنصات لنظامي iOS و Android.",
    features: [
      "React Native",
      "Flutter",
      "تطبيقات أصلية iOS/Android",
      "نشر في متاجر التطبيقات",
    ],
    gradient: "from-blue-500 to-teal-600",
  },
  {
    icon: Brain,
    title: "الذكاء الاصطناعي والتعلم الآلي",
    description: "حلول ذكية مدعومة بالذكاء الاصطناعي وخوارزميات التعلم الآلي.",
    features: [
      "معالجة اللغات الطبيعية",
      "الرؤية الحاسوبية",
      "التحليلات التنبؤية",
      "الشبكات العصبية",
    ],
    gradient: "from-teal-500 to-green-600",
  },
];

const ServicesSection: React.FC<ServicesSectionProps> = ({ isDark }) => {
  return (
    <section
      id="services"
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
            <span className="text-purple-600 me-3">خدماتنا</span>
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
            نقدم خدمات تطوير برمجيات شاملة لمساعدة الشركات على الازدهار في
            المشهد الرقمي. من المفهوم إلى النشر، نحن نغطي كل شيء.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`relative group rounded-2xl p-8 cursor-pointer overflow-hidden ${
                isDark ? "bg-gray-900" : "bg-white"
              } shadow-xl hover:shadow-2xl transition-all duration-500`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <service.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <motion.h3
                className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {service.title}
              </motion.h3>

              <motion.p
                className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {service.description}
              </motion.p>

              {/* Features */}
              <motion.ul
                className="space-y-2 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {service.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    } flex items-center`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.8 + featureIndex * 0.1,
                      duration: 0.4,
                    }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} ms-2`}
                    />
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Hover Effect */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 rounded-full bg-purple-600/10 -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ابدأ اليوم
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
