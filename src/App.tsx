import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";

// Components
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import TeamSection from "./components/TeamSection";
import CoursesSection from "./components/CoursesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { Project } from "./components/PortfolioSection";
import ProjectModal from "./components/ProjectModal";
import TemplatesSection from "./components/TemplatesSection";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Hooks
// import { useCursor } from "./hooks/useCursor";
// import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useProjects } from "./hooks/projectsHooks/useProjects";
import LinksSection from "./components/LinksSection";

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true;
    }
    return true;
  });

  const { isLoading } = useProjects();
  // const { position, isVisible, isClicking } = useCursor();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Initialize scroll animations
  // useScrollAnimation();

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Set RTL direction
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img
              src="/logo_light.jpg"
              alt="ZH Logo"
              className="w-28 h-28 mx-auto"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            ZH-CODING
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            تحويل الأفكار إلى واقع رقمي
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-purple-600 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage isDark={isDark} />} />
      <Route path="/register" element={<RegisterPage isDark={isDark} />} />
      <Route
        path="*"
        element={
          <ParallaxProvider>
            <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
              {/* Custom Cursor */}
              {/* <AnimatedCursor
                isVisible={isVisible}
                position={position}
                isClicking={isClicking}
              /> */}

              {/* Header */}
              <Header isDark={isDark} toggleTheme={toggleTheme} />

              {/* Main Content */}
              <main className="relative">
                {/* Hero Section */}
                <HeroSlider isDark={isDark} />
                {/* About Section */}
                <AboutSection isDark={isDark} />
                {/* Services Section */}
                <ServicesSection isDark={isDark} />
                {/* Portfolio Section */}
                <PortfolioSection
                  isDark={isDark}
                  onProjectClick={handleProjectClick}
                />
                {/* Templates Section */}
                <TemplatesSection isDark={isDark} />
                {/* links Section */}
                <LinksSection isDark={isDark} />
                {/* Team Section */}
                <TeamSection isDark={isDark} />
                {/* Courses Section */}
                <CoursesSection isDark={isDark} />
                {/* Contact Section */}
                <ContactSection isDark={isDark} />
              </main>

              {/* Footer */}
              <Footer isDark={isDark} />

              {/* Project Modal */}
              <ProjectModal
                project={selectedProject}
                isOpen={isProjectModalOpen}
                onClose={handleCloseProjectModal}
                isDark={isDark}
              />

              {/* Smooth Scroll Enhancement */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 z-50 origin-left"
                style={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{ once: false }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </ParallaxProvider>
        }
      />
    </Routes>
  );
}

export default App;
