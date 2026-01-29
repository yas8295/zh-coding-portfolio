import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useProjectsDemo } from "../hooks/projectsDemoHooks/useProjectsDemo";
import PackagesModal from "./PackagesModal";

interface TemplatesSectionProps {
  isDark: boolean;
}

interface ProjectDemo {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  images: string[];
  cover_image_url: string;
  demo_link: string;
  type: string;
}

const TemplatesSection: React.FC<TemplatesSectionProps> = ({ isDark }) => {
  const { data: templates, isLoading, isError } = useProjectsDemo();
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectDemo | null>(
    null
  );
  const [showPackagesModal, setShowPackagesModal] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <section
        id="templates"
        className={`py-20 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="text-center mb-16">
            <div
              className={`h-12 w-48 mx-auto rounded ${
                isDark ? "bg-gray-700" : "bg-gray-300"
              } mb-6`}
            ></div>
            <div
              className={`h-6 w-3/4 mx-auto rounded ${
                isDark ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`h-64 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
                ></div>
                <div className="p-6 space-y-4">
                  <div
                    className={`h-4 w-1/3 rounded ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`h-4 w-full rounded ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
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

  if (!templates || templates.length === 0) {
    return null;
  }

  return (
    <section
      id="templates"
      className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 pb-5 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}
          >
            المشاريع الجاهزة
          </h2>
          <p
            className={`text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            استعرض مجموعتنا الحصرية من التمبلاتس والمشاريع الجاهزة للاستخدام
            الفوري
          </p>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {templates.map((template: ProjectDemo) => (
            <motion.div
              key={template.id}
              variants={item}
              onClick={() => setSelectedTemplate(template)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-750"
                  : "bg-white hover:shadow-2xl"
              } ${
                hoveredTemplate === template.id ? "shadow-2xl" : "shadow-lg"
              }`}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <img
                  src={template.cover_image_url}
                  alt={template.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredTemplate === template.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isDark
                      ? "from-gray-900 via-transparent"
                      : "from-black/40 via-transparent"
                  } transition-opacity duration-300 ${
                    hoveredTemplate === template.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (!token) {
                          toast.error(
                            "يجب تسجيل الدخول أولاً لتتمكن من شراء الباقات",
                          );
                          return;
                        }
                        setSelectedTemplate(template);
                        setShowPackagesModal(true);
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingCart size={18} />
                      <span className="text-sm">اشتري الآن</span>
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={template.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        isDark
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-white/20 hover:bg-white/30 text-white"
                      }`}
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {template.type === "restorant" && "مطعم"}
                    {template.type === "ecommerce" && "متجر إلكتروني"}
                    {template.type === "portfolio" && "محفظة"}
                    {template.type === "saas" && "SaaS"}
                    {!["restorant", "ecommerce", "portfolio", "saas"].includes(
                      template.type,
                    ) && template.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {template.name
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h3>

                <p
                  className={`text-sm mb-4 line-clamp-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {template.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.technologies.slice(0, 2).map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDark
                          ? "bg-gray-700 text-purple-300"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {tech.split("\r\n")[0].slice(0, 20)}...
                    </span>
                  ))}
                  {template.technologies.length > 2 && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      +{template.technologies.length - 2} more
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      toast.error(
                        "يجب تسجيل الدخول أولاً لتتمكن من شراء الباقات",
                      );
                      return;
                    }
                    setSelectedTemplate(template);
                    setShowPackagesModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  اطلب الآن
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTemplate && !showPackagesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-6xl w-full rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 -z-10"
                onClick={() => setSelectedTemplate(null)}
              ></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-6 left-6 z-10 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                ✕
              </button>

              {/* Cover Image */}
              <div className="relative h-[500px] overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <img
                  src={selectedTemplate.cover_image_url}
                  alt={selectedTemplate.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h2
                  className={`text-3xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedTemplate.name
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h2>

                <p
                  className={`text-lg mb-6 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {selectedTemplate.description}
                </p>

                {/* Gallery */}
                {selectedTemplate.images &&
                  selectedTemplate.images.length > 0 && (
                    <div className="mb-8">
                      <h3
                        className={`text-xl font-bold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        صور العمل
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedTemplate.images.slice(0, 4).map((img, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg overflow-hidden h-72 w-full bg-gray-300"
                          >
                            <img
                              src={img}
                              alt={`${selectedTemplate.name} ${idx}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Technologies */}
                <div className="mb-8">
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    التقنيات المستخدمة
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.technologies.map((tech, idx) => (
                      <div
                        key={idx}
                        className={`text-sm px-3 py-2 rounded-lg ${
                          isDark
                            ? "bg-gray-700 text-purple-300"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {tech.split("\r\n")[0]}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedTemplate.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={20} />
                    زيارة الديمو
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        toast.error(
                          "يجب تسجيل الدخول أولاً لتتمكن من شراء الباقات",
                        );
                        return;
                      }
                      setShowPackagesModal(true);
                    }}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isDark
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    }`}
                  >
                    <ShoppingCart size={20} />
                    اطلب الآن
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Packages Modal */}
      <PackagesModal
        isOpen={showPackagesModal}
        onClose={() => setShowPackagesModal(false)}
        selectedTemplate={
          selectedTemplate
            ? { id: selectedTemplate.id, name: selectedTemplate.name }
            : null
        }
        isDark={isDark}
      />
    </section>
  );
};

export default TemplatesSection;
