import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogs } from "../hooks/blogHooks/useBlogs";

interface BlogSectionProps {
  isDark: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ isDark }) => {
  const { blogs, loading, error } = useBlogs();

  if (loading) {
    return (
      <section
        id="blog"
        className={`py-24 relative ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-300 rounded"></div>
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
        id="blog"
        className={`py-24 relative ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-6 text-center">
          <p className={`text-lg ${isDark ? "text-red-400" : "text-red-600"}`}>
            خطأ: {error}
          </p>
        </div>
      </section>
    );
  }

  const recentBlogs = blogs.slice(0, 3);

  return (
    <section
      id="blog"
      className={`py-24 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100"
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            آخر المقالات
          </h2>
          <p
            className={`text-lg md:text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            تابع أحدث الأخبار والمقالات المفيدة في مجال التكنولوجيا
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {recentBlogs?.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={`${import.meta.env.VITE_REACT_APP_API_URL}${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x300?text=Blog+Post";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <Link
                  to={`/blog/${blog.id}`}
                  className={`text-lg font-bold mb-2 line-clamp-2 hover:text-primary-500 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {blog.title}
                </Link>

                <p
                  className={`text-sm mb-4 line-clamp-2 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {blog.description}
                </p>

                {/* Meta Info */}
                <div
                  className={`flex items-center justify-between text-xs mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blog.user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(blog.created_at).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>

                {/* Read More Button */}
                <Link
                  to={`/blog/${blog.id}`}
                  className={`inline-flex items-center gap-2 font-medium transition-all duration-300 ${
                    isDark
                      ? "text-primary-400 hover:text-primary-300"
                      : "text-primary-600 hover:text-primary-700"
                  }`}
                >
                  اقرأ المزيد
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {blogs.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link
              to="/blog"
              className={`inline-block px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                isDark
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              عرض جميع المقالات
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
