import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ServerCrash, Info } from "lucide-react";
import { usePackages } from "../hooks/packagesHooks/usePackages";

interface PackagesSectionProps {
  isDark: boolean;
}

interface Package {
  id: number;
  name: string;
  price: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

const PackagesSection: React.FC<PackagesSectionProps> = ({ isDark }) => {
  const { data: packages, isLoading, isError, error, refetch } = usePackages();
  const [expandedPackage, setExpandedPackage] = useState<number | null>(null);

  if (isLoading) {
    return (
      <section
        id="packages"
        className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div
              className={`h-12 w-48 mx-auto rounded ${
                isDark ? "bg-gray-700" : "bg-gray-300"
              } mb-6`}
            ></div>
            <div
              className={`h-6 w-3/4 mx-auto rounded ${
                isDark ? "bg-gray-700" : "bg-gray-300"
              } mb-4`}
            ></div>
            <div
              className={`h-6 w-1/2 mx-auto rounded ${
                isDark ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
          </div>
          {/* Grid Skeleton */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 ${
                  isDark ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div
                  className={`h-8 w-2/3 rounded ${
                    isDark ? "bg-gray-700" : "bg-gray-300"
                  } mb-4`}
                ></div>
                <div
                  className={`h-10 w-1/2 rounded ${
                    isDark ? "bg-gray-700" : "bg-gray-300"
                  } mb-6`}
                ></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className={`h-4 w-full rounded ${
                        isDark ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
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
        id="packages"
        className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ServerCrash
            className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? "text-red-400" : "text-red-500"
            }`}
          />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            حدث خطأ
          </h2>
          <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {(error as Error).message || "لم نتمكن من تحميل الباقات."}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            حاول مرة أخرى
          </button>
        </div>
      </section>
    );
  }

  if (!packages || packages?.length === 0) {
    return (
      <section
        id="packages"
        className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Info
            className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? "text-blue-400" : "text-blue-500"
            }`}
          />
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            لا توجد باقات
          </h2>
          <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
            لا توجد باقات متاحة حالياً.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="packages"
      className={`py-20 ${isDark ? "" : ""}`}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              باقاتنا المميزة
            </span>
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
            اختر الباقة المناسبة لاحتياجات مشروعك وابدأ رحلة النجاح معنا
          </motion.p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {packages?.map((pkg: Package, index: number) => {
            const isPopular = index === 1;
            return (
              <motion.div
                key={pkg.id}
                className={`relative group rounded-2xl overflow-hidden ${
                  isPopular
                    ? isDark
                      ? "bg-gradient-to-br from-purple-900 to-blue-900 ring-2 ring-purple-600"
                      : "bg-gradient-to-br from-purple-50 to-blue-50 ring-2 ring-purple-600"
                    : isDark
                      ? "bg-gray-800"
                      : "bg-gray-50"
                } shadow-xl hover:shadow-2xl transition-all duration-500`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Background Gradient Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Popular Badge */}
                {isPopular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-1.5 rounded-full font-semibold text-sm shadow-lg">
                      الخيار الأفضل
                    </div>
                  </motion.div>
                )}

                {/* Content */}
                <div className="relative p-8">
                  {/* Package Title */}
                  <motion.h3
                    className={`text-2xl font-bold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {pkg.name}
                  </motion.h3>

                  {/* Price */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}
                      >
                        ${parseFloat(pkg.price).toFixed(0)}
                      </span>
                      <span
                        className={`text-lg font-semibold ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        دولار
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-2 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      السعر شامل الخدمات الأساسية
                    </p>
                  </motion.div>

                  {/* Features List */}
                  <motion.div
                    className="space-y-3 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {pkg.features.slice(0, 5).map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.15 + 0.5 + featureIndex * 0.08,
                          duration: 0.5,
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                        <span
                          className={`text-sm leading-relaxed ${
                            isDark ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Expand/Collapse Features Button */}
                  {pkg.features.length > 5 && (
                    <motion.button
                      onClick={() =>
                        setExpandedPackage(
                          expandedPackage === pkg.id ? null : pkg.id,
                        )
                      }
                      className="text-purple-600 font-semibold mb-6 text-sm hover:text-purple-700 transition-colors"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.6, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {expandedPackage === pkg.id
                        ? "عرض أقل ▲"
                        : `عرض المزيد ▼ (+${pkg.features.length - 5})`}
                    </motion.button>
                  )}

                  {/* Expanded Features */}
                  <AnimatePresence>
                    {expandedPackage === pkg.id && pkg.features.length > 5 && (
                      <motion.div
                        className="space-y-3 mb-8 pt-6 border-t border-gray-600/30"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {pkg.features.slice(5).map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex + 5}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{
                              delay: featureIndex * 0.05,
                              duration: 0.3,
                            }}
                          >
                            <motion.div
                              className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5"
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.4 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                            <span
                              className={`text-sm leading-relaxed ${
                                isDark ? "text-gray-200" : "text-gray-700"
                              }`}
                            >
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA Button */}
                  <motion.a
                    href="#contact"
                    className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isPopular
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                        : isDark
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: index * 0.15 + 0.7,
                      duration: 0.6,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    اختر هذه الباقة
                  </motion.a>
                </div>

                {/* Hover Effect Glow */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-600/20 -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500 blur-3xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            className={`text-lg mb-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            هل تريد باقة مخصصة تناسب احتياجات مشروعك؟
          </p>
          <motion.a
            href="#contact"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            تواصل معنا للاستفسار
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;
