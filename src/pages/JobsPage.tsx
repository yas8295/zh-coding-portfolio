import React from "react";
import JobsSection from "../components/JobsSection";
import Footer from "../components/Footer";
import { ParallaxProvider } from "react-scroll-parallax";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface JobsPageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const JobsPage: React.FC<JobsPageProps> = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <ParallaxProvider>
      <div
        className={`min-h-screen bg-white dark:bg-gray-900 ${isDark ? "dark" : ""}`}
      >
        <main className="relative">
          {/* Hero Section */}

          <button
            onClick={() => navigate(-1)}
            className="absolute end-8 top-8 w-12 h-12 rounded-full bg-white flex items-center justify-center z-50 shadow-xl border"
          >
            <FaChevronLeft className="w-5 h-5" />{" "}
          </button>
          <JobsSection isDark={isDark} />
        </main>
        <Footer isDark={isDark} />
      </div>
    </ParallaxProvider>
  );
};

export default JobsPage;
