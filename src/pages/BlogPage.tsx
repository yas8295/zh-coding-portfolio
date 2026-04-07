import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Search, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/blogHooks/useBlogs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaChevronLeft } from "react-icons/fa";

interface BlogPageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate();
  const { blogs, loading, error } = useBlogs();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={`min-h-screen dark:bg-neutral-900 ${isDark ? "dark" : ""}`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section
        className={`py-20 ${isDark ? "bg-gradient-to-br from-neutral-900 to-neutral-800" : "bg-gradient-to-br from-neutral-900 to-neutral-800 relative"}`}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute end-8 top-8 w-12 h-12 rounded-full bg-white flex items-center justify-center"
        >
          <FaChevronLeft className="w-5 h-5" />{" "}
        </button>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl mb-6">المدونة</h1>
            <p className="text-xl text-neutral-300">
              اكتشف أحدث المقالات والمواضيع في مجال التكنولوجيا والبرمجة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section
        className={`py-12 ${isDark ? "bg-neutral-800" : "bg-neutral-50"}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute right-4 top-4 w-6 h-6 text-neutral-400" />
            <input
              type="text"
              placeholder="ابحث عن مقالة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pr-12 pl-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                isDark
                  ? "bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-500"
                  : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:border-primary-500"
              } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
            />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className={`py-24 ${isDark ? "bg-neutral-900" : "bg-white"}`}>
        <div className="container mx-auto px-6">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`rounded-2xl h-96 animate-pulse ${
                    isDark ? "bg-neutral-800" : "bg-neutral-200"
                  }`}
                />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center text-red-500">
              <p>حدث خطأ في تحميل المدونة: {error}</p>
            </div>
          )}

          {!loading && !error && filteredBlogs.length === 0 && (
            <div className="text-center">
              <p
                className={`text-xl ${
                  isDark ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                لم نجد مقالات مطابقة للبحث
              </p>
            </div>
          )}

          {!loading && !error && filteredBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group ${
                    isDark
                      ? "bg-neutral-800 border border-neutral-700 hover:border-primary-500"
                      : "bg-white border border-neutral-200 hover:border-primary-500"
                  }`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_API_URL}${blog.image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/400x300?text=Blog+Post";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <Link
                      to={`/blog/${blog.id}`}
                      className={`text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors duration-300 ${
                        isDark ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      {blog.title}
                    </Link>

                    <p
                      className={`text-sm mb-4 line-clamp-3 ${
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {blog.description}
                    </p>

                    {/* Meta Info */}
                    <div
                      className={`flex items-center justify-between text-xs mb-6 pb-4 border-b ${
                        isDark
                          ? "text-neutral-400 border-neutral-700"
                          : "text-neutral-500 border-neutral-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{blog.user.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(blog.created_at).toLocaleDateString(
                            "en-GB",
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/blog/${blog.id}`}
                      className={`inline-flex items-center gap-2 font-bold transition-all duration-300 group/btn ${
                        isDark
                          ? "text-primary-400 hover:text-primary-300"
                          : "text-primary-600 hover:text-primary-700"
                      }`}
                    >
                      اقرأ المزيد
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer isDark={isDark} />
    </div>
  );
};

export default BlogPage;
