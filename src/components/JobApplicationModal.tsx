import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone, FileText, MessageSquare } from "lucide-react";
import { Job } from "../hooks/jobsHooks/useJobs";
import { useApplyForJob } from "../hooks/jobsHooks/useJobs";

interface JobApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  isDark,
}) => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    whatsapp: "",
    cover_letter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const applyMutation = useApplyForJob();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    try {
      const submitData = new FormData();
      submitData.append("full_name", formData.full_name);
      submitData.append("phone", formData.phone);
      submitData.append("whatsapp", formData.whatsapp);
      submitData.append("cover_letter", formData.cover_letter);
      if (resume) {
        submitData.append("resume", resume);
      }

      await applyMutation.mutateAsync({ jobId: job.id, formData: submitData });

      // Success
      setFormData({
        full_name: "",
        phone: "",
        whatsapp: "",
        cover_letter: "",
      });
      setResume(null);

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      // Error is handled by React Query
      console.error("Application submission failed:", error);
    }
  };

  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
              isDark ? "bg-neutral-900" : "bg-white"
            } shadow-2xl`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className={`absolute top-4 end-4 z-10 p-2 rounded-full ${
                isDark
                  ? "bg-neutral-800/60 text-white hover:bg-neutral-700"
                  : "bg-white text-neutral-900 hover:bg-neutral-100"
              } shadow-lg transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Header */}
            <div
              className={`p-6 border-b ${isDark ? "border-neutral-700" : "border-neutral-200"}`}
            >
              <h2
                className={`text-2xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                التقدم للوظيفة: {job.title}
              </h2>
              <p
                className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              >
                يرجى ملء البيانات التالية لإرسال طلبك
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  الاسم الكامل *
                </label>
                <div className="relative">
                  <User
                    className={`absolute right-3 top-3 w-5 h-5 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border transition-all duration-200 ${
                      isDark
                        ? "bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-500"
                        : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:border-primary-500"
                    } focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  رقم الهاتف *
                </label>
                <div className="relative">
                  <Phone
                    className={`absolute right-3 top-3 w-5 h-5 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border transition-all duration-200 ${
                      isDark
                        ? "bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-500"
                        : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:border-primary-500"
                    } focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  رقم الواتساب
                </label>
                <div className="relative">
                  <Phone
                    className={`absolute right-3 top-3 w-5 h-5 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border transition-all duration-200 ${
                      isDark
                        ? "bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-500"
                        : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:border-primary-500"
                    } focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="أدخل رقم الواتساب (اختياري)"
                  />
                </div>
              </div>

              {/* Resume */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  السيرة الذاتية *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className={`w-full pr-4 pl-4 py-3 rounded-xl border transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium ${
                      isDark
                        ? "bg-neutral-800 border-neutral-600 text-white file:bg-primary-600 file:text-white hover:file:bg-primary-700"
                        : "bg-white border-neutral-300 text-neutral-900 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    } focus:ring-2 focus:ring-primary-500/20`}
                  />
                  <FileText
                    className={`absolute left-3 top-3 w-5 h-5 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                </div>
                <p
                  className={`text-xs mt-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  يرجى رفع ملف PDF أو Word (حد أقصى 5MB)
                </p>
              </div>

              {/* Cover Letter */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  رسالة التقديم
                </label>
                <div className="relative">
                  <MessageSquare
                    className={`absolute right-3 top-3 w-5 h-5 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <textarea
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
                      isDark
                        ? "bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-500"
                        : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:border-primary-500"
                    } focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="اكتب رسالة تقديم قصيرة (اختياري)"
                  />
                </div>
              </div>

              {/* Submit Message */}
              {applyMutation.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    isDark
                      ? "bg-green-600/20 text-green-400"
                      : "bg-green-50 text-green-800"
                  }`}
                >
                  تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
                </motion.div>
              )}

              {applyMutation.isError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    isDark
                      ? "bg-red-600/20 text-red-400"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={applyMutation.isLoading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  applyMutation.isLoading
                    ? "bg-neutral-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
                whileHover={!applyMutation.isLoading ? { scale: 1.02 } : {}}
                whileTap={!applyMutation.isLoading ? { scale: 0.98 } : {}}
              >
                {applyMutation.isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    إرسال الطلب
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationModal;
