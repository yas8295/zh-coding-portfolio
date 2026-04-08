import React from "react";
import { motion } from "framer-motion";
import { ServerCrash, Info } from "lucide-react";
import { useServices } from "../hooks/servicesHooks/useServices";
import ServicesCardBg from "./ServicesCardBg";

interface ServicesSectionProps {
  isDark: boolean;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isDark }) => {
  const { data: services, isLoading, isError, error, refetch } = useServices();

  if (isLoading) {
    return (
      <section
        id="services"
        className={`py-20 ${isDark ? "bg-neutral-800/60" : "bg-neutral-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div
              className={`h-12 w-48 mx-auto rounded ${
                isDark ? "bg-neutral-700" : "bg-neutral-300"
              } mb-6`}
            ></div>
            <div
              className={`h-6 w-3/4 mx-auto rounded ${
                isDark ? "bg-neutral-700" : "bg-neutral-300"
              } mb-4`}
            ></div>
            <div
              className={`h-6 w-1/2 mx-auto rounded ${
                isDark ? "bg-neutral-700" : "bg-neutral-300"
              }`}
            ></div>
          </div>
          {/* Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 ${
                  isDark ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-xl mb-6 ${
                    isDark ? "bg-neutral-700" : "bg-neutral-300"
                  }`}
                ></div>
                <div
                  className={`h-6 w-3/4 rounded ${
                    isDark ? "bg-neutral-700" : "bg-neutral-300"
                  } mb-4`}
                ></div>
                <div
                  className={`h-4 w-full rounded ${
                    isDark ? "bg-neutral-700" : "bg-neutral-300"
                  } mb-2`}
                ></div>
                <div
                  className={`h-4 w-5/6 rounded ${
                    isDark ? "bg-neutral-700" : "bg-neutral-300"
                  } mb-6`}
                ></div>
                <div className="space-y-3">
                  <div
                    className={`h-4 w-1/2 rounded ${
                      isDark ? "bg-neutral-700" : "bg-neutral-300"
                    }`}
                  ></div>
                  <div
                    className={`h-4 w-2/3 rounded ${
                      isDark ? "bg-neutral-700" : "bg-neutral-300"
                    }`}
                  ></div>
                  <div
                    className={`h-4 w-1/2 rounded ${
                      isDark ? "bg-neutral-700" : "bg-neutral-300"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        id="services"
        className={`py-20 ${isDark ? "bg-neutral-800/60" : "bg-neutral-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ServerCrash
            className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? "text-red-400" : "text-red-500"
            }`}
          />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            حدث خطأ
          </h2>
          <p
            className={`mb-6 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
          >
            {(error as Error).message || "لم نتمكن من تحميل الخدمات."}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            حاول مرة أخرى
          </button>
        </div>
      </section>
    );
  }

  if (!services || services?.length === 0) {
    return (
      <section
        id="services"
        className={`py-20 ${isDark ? "bg-neutral-800/60" : "bg-neutral-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Info
            className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? "text-primary-400" : "text-primary-500"
            }`}
          />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            لا توجد خدمات
          </h2>
          <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
            لا توجد خدمات متاحة حالياً.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className={`py-20 ${isDark ? "bg-neutral-800/60" : "bg-neutral-50"}`}
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
            className={`text-4xl md:text-5xl mb-6 ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-600 me-3">خدماتنا</span>
          </motion.h2>

          <motion.p
            className={`text-lg max-w-3xl mx-auto ${
              isDark ? "text-neutral-300" : "text-neutral-600"
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
          {services?.map((service: Service, index: number) => {
            // hover glow gradient adapts to mode with green tones
            const glowGradient = isDark
              ? "from-primary-800 to-primary-600"
              : "from-primary-200 to-primary-100";
            const iconRing = isDark
              ? "ring-white/40 group-hover:ring-primary-700/30"
              : "ring-white/60 group-hover:ring-primary-200/40";
            return (
              <motion.div
                key={index}
                className={`relative group rounded-3xl p-5 cursor-pointer overflow-hidden transform transition-all duration-500
                  ${isDark ? "bg-neutral-900/70 backdrop-blur-sm" : "bg-white/70 backdrop-blur-sm"}
                  shadow-2xl hover:shadow-3xl hover:-translate-y-2`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* modern gradient glow overlay */}
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-r ${glowGradient} opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-lg`}
                />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Icon */}
                <motion.div
                  className={`w-full h-64 rounded-2xl relative flex items-center justify-center mb-6 ring-4 ${iconRing} transition-all duration-500 overflow-hidden`}
                  transition={{ duration: 0.6 }}
                >
                  {isDark && (
                    <ServicesCardBg
                      speed={1}
                      frequency={2}
                      intensity={100}
                      theme={"monochrome"}
                      shape={"hexagon"}
                      scale={0.3}
                      offsetX={0}
                      offsetY={0}
                      colorShift={[1, 0.5, 76]}
                      transparent={true}
                    />
                  )}

                  <img
                    src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                      service.icon
                    }`}
                    alt={service.title}
                    className="w-24 h-24 text-white"
                  />
                </motion.div>

                {/* Content */}
                <motion.h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-neutral-900"
                  }`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  dangerouslySetInnerHTML={{ __html: service.description }}
                  className={`${
                    isDark ? "text-neutral-300" : "text-neutral-600"
                  } mb-6`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                ></motion.p>

                {/* Features */}
                {/* <motion.ul
                  className="space-y-2 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {service?.features?.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className={`text-sm ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
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
                </motion.ul> */}

                {/* Hover Effect */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"
                  style={{
                    background:
                      "conic-gradient(#1febab, #1a1d25, #21263b, #dc6600)",
                    opacity: 0.1,
                  }}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <a href="#contact">
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-gradient-to-r from-primary-600 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-primary-700 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ اليوم
            </motion.button>
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default ServicesSection;
