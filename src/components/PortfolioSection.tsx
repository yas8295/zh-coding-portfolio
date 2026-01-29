import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye, ServerCrash, Info } from "lucide-react";
import { useProjects } from "../hooks/projectsHooks/useProjects";

interface PortfolioSectionProps {
  isDark: boolean;
  onProjectClick: (project: Project) => void;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string | null;
  project_type: string | null;
  live_link?: string | null;
  github_link?: string | null;
  fullDescription?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  challenges?: string[];
  results?: string[];
  duration?: string | null;
  end_date?: string | null;
  location?: string | null;
}

const categories = ["الكل", "تطوير المواقع", "تطوير التطبيقات"];

const categoryMapping: { [key: string]: string } = {
  الكل: "All",
  "تطوير المواقع": "Web Application",
  "تطوير التطبيقات": "Mobile application",
};

const PROJECTS_PER_PAGE = 6;

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  isDark,
  onProjectClick,
}) => {
  const { data: projects, isLoading, isError, error, refetch } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_PAGE);

  if (isLoading) {
    return (
      <section
        id="work"
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
          {/* Filter Skeleton */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-12 w-28 rounded-full ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
          {/* Grid Skeleton */}
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
                <div className="p-6">
                  <div
                    className={`h-4 w-1/3 rounded ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    } mb-4`}
                  ></div>
                  <div
                    className={`h-6 w-3/4 rounded ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    } mb-3`}
                  ></div>
                  <div
                    className={`h-4 w-full rounded ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    } mb-1`}
                  ></div>
                  <div
                    className={`h-4 w-5/6 rounded ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    } mb-4`}
                  ></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className={`h-6 w-16 rounded-full ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
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
        id="work"
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
            {(error as Error).message || "لم نتمكن من تحميل المشاريع."}
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

  const filteredProjects =
    projects?.filter(
      (project) =>
        selectedCategory === "الكل" ||
        project.project_type === categoryMapping[selectedCategory]
    ) || [];

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  const handleViewMore = () => {
    setVisibleProjects((prev) => prev + PROJECTS_PER_PAGE);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleProjects(PROJECTS_PER_PAGE); // Reset to initial count when category changes
  };

  if (!projects || projects.length === 0) {
    return (
      <section
        id="work"
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
            لا توجد مشاريع
          </h2>
          <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
            لا توجد مشاريع لعرضها في الوقت الحالي.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
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
            <span className="text-purple-600 me-3">أعمالنا</span>
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
            اكتشف محفظة مشاريعنا الناجحة التي تعرض خبرتنا والتزامنا بتقديم حلول
            برمجية استثنائية.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-purple-600 text-white shadow-lg"
                  : isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onProjectClick(project)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {project.image ? (
                    <motion.img
                      src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                        project.image
                      }`}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      whileHover={{ scale: 1.1 }}
                    />
                  ) : (
                    <div
                      className={`w-full h-full ${
                        isDark ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    />
                  )}

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-purple-900/80 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex space-x-4">
                      {project.live_link && (
                        <motion.a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-6 h-6" />
                        </motion.a>
                      )}
                      {project.github_link && (
                        <motion.a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-6 h-6" />
                        </motion.a>
                      )}
                      <motion.button
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-6 h-6" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.div
                    className="text-sm text-purple-600 font-medium mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {project.project_type}
                  </motion.div>

                  <motion.h3
                    className={`text-xl font-bold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } mb-4 text-sm leading-relaxed`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {project?.technologies?.slice(0, 4)?.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project?.technologies?.length > 4 && (
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark
                            ? "bg-purple-600/20 text-purple-300"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {hasMoreProjects && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleViewMore}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 ${
                isDark
                  ? "border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                  : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              عرض المزيد من المشاريع (
              {filteredProjects.length - visibleProjects} متبقي)
            </motion.button>
          </motion.div>
        )}

        {/* Show All Projects Button (when no more to load) */}
        {!hasMoreProjects && filteredProjects.length > PROJECTS_PER_PAGE && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setVisibleProjects(PROJECTS_PER_PAGE)}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 ${
                isDark
                  ? "border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white"
                  : "border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              عرض أقل
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
