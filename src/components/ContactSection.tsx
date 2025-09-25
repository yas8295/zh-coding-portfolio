import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { usePostContact } from "../hooks/contactUsHooks/usePostContact";
import { useServices } from "../hooks/servicesHooks/useServices";

interface ContactSectionProps {
  isDark: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { data: services, isLoading: isLoadingServices } = useServices();
  const { mutate, isLoading: isSubmitting } = usePostContact();

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "راسلنا",
      details: "info@zh-coding.com",
      action: "mailto:info@zh-coding.com",
    },
    {
      icon: Phone,
      title: "تواصل معنا",
      details: "201557404012+",
      action: "https://wa.me/+201557404012",
    },
    {
      icon: MapPin,
      title: "زرنا",
      details: "السلطان حسين, أمام شركة اتصالات, الاسماعيلية",
      action:
        "https://www.google.com/maps/place/%D9%81%D8%B1%D8%B9+%D8%A7%D8%AA%D8%B5%D8%A7%D9%84%D8%A7%D8%AA%E2%80%AD/@30.5830388,32.2731758,13z/data=!4m10!1m2!2m1!1z2YHZiNiv2KfZgdmI2YYg2KjYp9mE2YLYsdioINmF2YYg2KfZhNiz2YTYt9in2YYg2K3Ys9mK2YbYjCDYp9mE2KrZhdiz2KfYrdiMINmC2LPZhSDYo9mI2YQg2KfZhNin2LPZhdin2LnZitmE2YrYqdiMINmF2LXYsQ!3m6!1s0x14f85922854e0c0b:0x37ebd464af6adce1!8m2!3d30.5923057!4d32.2762854!15sCnnZgdmI2K_Yp9mB2YjZhiDYqNin2YTZgtix2Kgg2YXZhiDYp9mE2LPZhNi32KfZhiDYrdiz2YrZhtiMINin2YTYqtmF2LPYp9it2Iwg2YLYs9mFINij2YjZhCDYp9mE2KfYs9mF2KfYudmK2YTZitip2Iwg2YXYtdixIgOIAQFadSJz2YHZiNiv2KfZgdmI2YYg2KjYp9mE2YLYsdioINmF2YYg2KfZhNiz2YTYt9in2YYg2K3Ys9mK2YYg2KfZhNiq2YXYs9in2K0g2YLYs9mFINij2YjZhCDYp9mE2KfYs9mF2KfYudmK2YTZitipINmF2LXYsZIBI3RlbGVjb21tdW5pY2F0aW9uc19zZXJ2aWNlX3Byb3ZpZGVymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5RTkRVemVtSlJFQUWqAb0BCgsvZy8xdm40azliMBABKhIiDtmB2YjYr9in2YHZiNmGKDYyHxABIhu3Mw12b2fX661k6Y8XDLxRH5wtcTr9tHZsxqUydxACInPZgdmI2K_Yp9mB2YjZhiDYqNin2YTZgtix2Kgg2YXZhiDYp9mE2LPZhNi32KfZhiDYrdiz2YrZhiDYp9mE2KrZhdiz2KfYrSDZgtiz2YUg2KPZiNmEINin2YTYp9iz2YXYp9i52YrZhNmK2Kkg2YXYtdix4AEA-gEECAAQGg!16s%2Fg%2F11gydlxkbm?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <section
      id="contact"
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
            تواصل
            <span className="text-purple-600 ms-3"> معنا </span>
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
            مستعد لبدء مشروعك القادم؟ دعنا نناقش كيف يمكننا مساعدتك في تحويل
            أفكارك إلى حلول رقمية استثنائية.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            className={`${
              isDark ? "bg-gray-900" : "bg-white"
            } rounded-2xl p-8 shadow-xl`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              أرسل لنا رسالة
            </motion.h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  الاسم *
                </label>
                <input
                  type="text"
                  {...register("name", { required: "الاسم مطلوب" })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                    errors.name
                      ? "border-red-500"
                      : isDark
                      ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="اسمك الكامل"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "عنوان بريد إلكتروني غير صحيح",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                    errors.email
                      ? "border-red-500"
                      : isDark
                      ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "رقم الهاتف مطلوب",
                    pattern: {
                      value: /^[0-9+-]+$/,
                      message: "رقم هاتف غير صحيح",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                    errors.phone
                      ? "border-red-500"
                      : isDark
                      ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="رقم هاتفك"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </motion.div>

              {/* Service Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  الخدمة المطلوبة *
                </label>
                <div className="relative">
                  <select
                    {...register("service", { required: "الرجاء اختيار خدمة" })}
                    disabled={isLoadingServices}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none appearance-none ${
                      errors.service
                        ? "border-red-500"
                        : isDark
                        ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500"
                        : "border-gray-300 bg-white text-gray-900 focus:border-purple-500"
                    }`}
                  >
                    <option value="">
                      {isLoadingServices
                        ? "جاري تحميل الخدمات..."
                        : "اختر خدمة"}
                    </option>
                    {services?.map((service: { id: string; title: string }) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-400">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.service.message}
                  </p>
                )}
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  الرسالة *
                </label>
                <textarea
                  {...register("message", { required: "الرسالة مطلوبة" })}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none resize-none ${
                    errors.message
                      ? "border-red-500"
                      : isDark
                      ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="أخبرنا عن مشروعك..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>إرسال الرسالة</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  target="_blank"
                  key={index}
                  href={info.action}
                  className={`group block p-6 rounded-2xl transition-all duration-300 ${
                    isDark
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-white hover:bg-gray-50"
                  } shadow-lg hover:shadow-xl`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {info.title}
                      </h4>
                      <p
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-600"
                        } group-hover:text-purple-600 transition-colors duration-200`}
                      >
                        {info.details}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
              className={`h-64 rounded-2xl overflow-hidden ${
                isDark ? "bg-gray-900" : "bg-gray-200"
              } shadow-lg`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.2171096719697!2d32.273175799999995!3d30.583038799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f85922854e0c0b%3A0x37ebd464af6adce1!2z2YHZiNiv2KfZgdmI2YYg2KjYp9mE2YLYsdioINmF2YYg2KfZhNiz2YTYt9in2YYg2K3Ys9mK2YbYjCDYp9mE2KrZhdiz2KfYrdiMINmC2LPZhSDYo9mI2YQg2KfZhNin2LPZhdin2LnZitmE2YrYqdiMINmF2LXYsQ!5e0!3m2!1sar!2seg!4v1727251500000!5m2!1sar!2seg"
                  className="h-full w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
