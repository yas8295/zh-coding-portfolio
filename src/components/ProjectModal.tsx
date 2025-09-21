import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, Users, Award } from "lucide-react";
import { Project } from "./PortfolioSection";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  isDark,
}) => {
  if (!project) return null;

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
            className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl ${
              isDark ? "bg-gray-900" : "bg-white"
            } shadow-2xl`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
                isDark
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              } shadow-lg transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Hero Image */}
            <div className="relative h-80 overflow-hidden rounded-t-2xl">
              <img
                src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                  project.image
                }`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Project Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div
                  className="text-sm text-purple-300 font-medium mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.project_type}
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.title}
                </motion.h1>

                {/* Action Buttons */}
                <motion.div
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.live_link && (
                    <motion.a
                      href={project.live_link}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  {project.github_link && (
                    <motion.a
                      href={project.github_link}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Description */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2
                      className={`text-2xl font-bold mb-4 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Project Overview
                    </h2>
                    <p
                      className={`text-lg leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3
                        className={`text-xl font-bold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Key Features
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {project.features?.map((feature, index) => (
                          <motion.div
                            key={index}
                            className={`flex items-center space-x-3 p-3 rounded-lg ${
                              isDark ? "bg-gray-800" : "bg-gray-50"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-purple-600 rounded-full" />
                            <span
                              className={
                                isDark ? "text-gray-300" : "text-gray-700"
                              }
                            >
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Challenges */}
                  {project.challenges && project.challenges.length > 0 && (
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3
                        className={`text-xl font-bold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Technical Challenges
                      </h3>
                      <div className="space-y-3">
                        {project.challenges?.map((challenge, index) => (
                          <motion.div
                            key={index}
                            className={`p-4 rounded-lg border-l-4 border-orange-500 ${
                              isDark ? "bg-gray-800" : "bg-orange-50"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                          >
                            <span
                              className={
                                isDark ? "text-gray-300" : "text-gray-700"
                              }
                            >
                              {challenge}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Results */}
                  {project.results && project.results.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <h3
                        className={`text-xl font-bold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Results & Impact
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {project.results?.map((result, index) => (
                          <motion.div
                            key={index}
                            className={`p-4 rounded-lg border-l-4 border-green-500 ${
                              isDark ? "bg-gray-800" : "bg-green-50"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 + index * 0.1 }}
                          >
                            <div className="flex items-center space-x-2">
                              <Award className="w-5 h-5 text-green-500" />
                              <span
                                className={
                                  isDark ? "text-gray-300" : "text-gray-700"
                                }
                              >
                                {result}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  {/* Project Info */}
                  <motion.div
                    className={`p-6 rounded-2xl ${
                      isDark ? "bg-gray-800" : "bg-gray-50"
                    } mb-6`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3
                      className={`text-lg font-bold mb-4 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <div>
                          <div
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Duration
                          </div>
                          <div
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            3-6 months
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <div>
                          <div
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Team Size
                          </div>
                          <div
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            4-8 developers
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Additional Images */}
                  {project.images && project.images.length > 1 && (
                    <motion.div
                      className={`p-6 rounded-2xl ${
                        isDark ? "bg-gray-800" : "bg-gray-50"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3
                        className={`text-lg font-bold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Project Gallery
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {project.images.slice(1, 5).map((image, index) => (
                          <motion.img
                            key={index}
                            src={image}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
