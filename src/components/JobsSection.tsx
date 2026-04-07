import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useJobs, Job } from "../hooks/jobsHooks/useJobs";
import JobApplicationModal from "./JobApplicationModal";

interface JobsSectionProps {
  isDark: boolean;
}

const JobsSection: React.FC<JobsSectionProps> = ({ isDark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error, pagination } = useJobs(currentPage);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <section
        id="jobs"
        className={`py-24 relative ${isDark ? "bg-neutral-900" : "bg-neutral-50"}`}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-300 rounded w-1/4 mx-auto mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-neutral-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="jobs"
        className={`py-24 relative ${isDark ? "bg-neutral-900" : "bg-neutral-50"}`}
      >
        <div className="container mx-auto px-6 text-center">
          <p className={`text-lg ${isDark ? "text-red-400" : "text-red-600"}`}>
            خطأ في تحميل الوظائف: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="jobs"
      className={`py-24 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-neutral-900/40 via-neutral-800/40 to-neutral-900/40"
          : "bg-gradient-to-br from-white via-neutral-50 to-neutral-100"
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full opacity-5 blur-3xl"
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl mb-6 ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            الوظائف المتاحة
          </h2>
          <p
            className={`text-lg md:text-xl ${
              isDark ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            انضم إلى فريقنا وكن جزءاً من الابتكار
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                isDark
                  ? "bg-neutral-800 border border-neutral-700"
                  : "bg-white border border-neutral-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    isDark ? "bg-primary-600/20" : "bg-primary-50"
                  }`}
                >
                  <Briefcase
                    className={`w-6 h-6 ${
                      isDark ? "text-primary-400" : "text-primary-600"
                    }`}
                  />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === "open"
                      ? isDark
                        ? "bg-green-600/20 text-green-400"
                        : "bg-green-100 text-green-800"
                      : isDark
                        ? "bg-red-600/20 text-red-400"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {job.status === "open" ? "متاح" : "مغلق"}
                </span>
              </div>

              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {job.title}
              </h3>

              <p
                className={`text-sm mb-4 line-clamp-3 ${
                  isDark ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                {job.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin
                    className={`w-4 h-4 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      isDark ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {job.location === "remote" ? "عن بعد" : "في الموقع"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock
                    className={`w-4 h-4 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      isDark ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {job.type === "full-time"
                      ? "دوام كامل"
                      : job.type === "part-time"
                        ? "دوام جزئي"
                        : "عقد"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign
                    className={`w-4 h-4 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {job.salary}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleApply(job)}
                disabled={job.status !== "open"}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                  job.status === "open"
                    ? `bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                        isDark ? "hover:bg-primary-500" : ""
                      }`
                    : `bg-neutral-300 text-neutral-500 cursor-not-allowed ${
                        isDark ? "bg-neutral-700 text-neutral-400" : ""
                      }`
                }`}
              >
                {job.status === "open" ? "تقدم الآن" : "مغلق"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center items-center gap-4 mt-12"
          >
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={!pagination.prev_page_url}
              className={`p-3 rounded-xl transition-all duration-300 ${
                pagination.prev_page_url
                  ? `bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl ${
                      isDark ? "hover:bg-primary-500" : ""
                    }`
                  : `bg-neutral-300 text-neutral-500 cursor-not-allowed ${
                      isDark ? "bg-neutral-700 text-neutral-400" : ""
                    }`
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {pagination.links.map((link, index) => (
                <button
                  key={index}
                  onClick={() =>
                    link.url && handlePageChange(parseInt(link.label))
                  }
                  disabled={!link.url}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    link.active
                      ? `bg-primary-600 text-white shadow-lg ${
                          isDark ? "bg-primary-500" : ""
                        }`
                      : link.url
                        ? `hover:bg-primary-100 hover:text-primary-700 ${
                            isDark
                              ? "hover:bg-neutral-700 text-neutral-300"
                              : "text-neutral-600"
                          }`
                        : `text-neutral-400 cursor-not-allowed ${
                            isDark ? "text-neutral-500" : ""
                          }`
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={!pagination.next_page_url}
              className={`p-3 rounded-xl transition-all duration-300 ${
                pagination.next_page_url
                  ? `bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl ${
                      isDark ? "hover:bg-primary-500" : ""
                    }`
                  : `bg-neutral-300 text-neutral-500 cursor-not-allowed ${
                      isDark ? "bg-neutral-700 text-neutral-400" : ""
                    }`
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Job Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isDark={isDark}
        />
      )}
    </section>
  );
};

export default JobsSection;
