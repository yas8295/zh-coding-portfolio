import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { usePostContact } from "../hooks/contactUsHooks/usePostContact";
import { toast } from "react-toastify";

interface ContactSectionProps {
  isDark: boolean;
}

interface FormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

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
      details: "hello@zhtech.com",
      action: "mailto:hello@zhtech.com",
    },
    {
      icon: Phone,
      title: "اتصل بنا",
      details: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "زرنا",
      details: "شارع التقنية ١٢٣، سان فرانسيسكو، كاليفورنيا ٩٤١٠٥",
      action: "https://maps.google.com",
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

              {/* Subject Field */}
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
                  الموضوع *
                </label>
                <input
                  type="text"
                  {...register("subject", { required: "الموضوع مطلوب" })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                    errors.subject
                      ? "border-red-500"
                      : isDark
                      ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500"
                      : "border-gray-300 bg-white text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="ما هو موضوع رسالتك؟"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
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
                <div className="text-center">
                  <MapPin
                    className={`w-12 h-12 mx-auto mb-4 ${
                      isDark ? "text-purple-400" : "text-purple-600"
                    }`}
                  />
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } font-medium`}
                  >
                    خريطة تفاعلية
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    انقر لعرض الموقع
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
