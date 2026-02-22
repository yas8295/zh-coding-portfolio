import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

interface BlogSectionProps {
  isDark: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "مستقبل الذكاء الاصطناعي في تطوير البرمجيات",
    excerpt:
      "استكشاف كيف يُحدث الذكاء الاصطناعي ثورة في طريقة بناء ونشر التطبيقات البرمجية.",
    author: "أحمد محمد",
    date: "2024-01-15",
    readTime: "٥ دقائق قراءة",
    image:
      "https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "الذكاء الاصطناعي والتعلم الآلي",
  },
  {
    id: 2,
    title: "أفضل الممارسات لأداء React",
    excerpt:
      "تعلم التقنيات الأساسية لتحسين تطبيقات React للحصول على أداء أفضل وتجربة مستخدم محسنة.",
    author: "فاطمة علي",
    date: "2024-01-12",
    readTime: "٧ دقائق قراءة",
    image:
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "تطوير المواقع",
  },
  {
    id: 3,
    title: "أنماط الهندسة السحابية للشركات الناشئة",
    excerpt:
      "اكتشف أنماط الهندسة السحابية القابلة للتوسع التي تساعد الشركات الناشئة في بناء حلول قوية وفعالة من حيث التكلفة.",
    author: "محمد حسن",
    date: "2024-01-10",
    readTime: "٦ دقائق قراءة",
    image:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "الهندسة السحابية",
  },
];

const BlogSection: React.FC<BlogSectionProps> = ({ isDark }) => {
  return (
    <section
      id="blog"
      className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}
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
            أحدث
            <span className="text-primary-600 ms-3">مقالات المدونة</span>
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
            ابق على اطلاع بأحدث رؤانا ودروسنا واتجاهات الصناعة في تطوير
            البرمجيات والتكنولوجيا.
          </motion.p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          className={`rounded-2xl overflow-hidden shadow-2xl mb-16 ${
            isDark ? "bg-gray-800/60" : "bg-white"
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <motion.img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  مميز
                </span>
              </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                className="text-primary-600 font-medium text-sm mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {blogPosts[0].category}
              </motion.div>

              <motion.h3
                className={`text-2xl md:text-3xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {blogPosts[0].title}
              </motion.h3>

              <motion.p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-600"
                } mb-6 text-lg leading-relaxed`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {blogPosts[0].excerpt}
              </motion.p>

              <motion.div
                className={`flex items-center space-x-6 mb-6 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(blogPosts[0].date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{blogPosts[0].readTime}</span>
                </div>
              </motion.div>

              <motion.button
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-500 transition-colors duration-200"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                اقرأ المزيد
                <ArrowRight className="w-5 h-5 me-2 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              className={`group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                isDark ? "bg-gray-800/60" : "bg-white"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? "bg-gray-900/80 text-white"
                        : "bg-white/90 text-gray-900"
                    }`}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.h3
                  className={`text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {post.title}
                </motion.h3>

                <motion.p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } mb-4 leading-relaxed`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {post.excerpt}
                </motion.p>

                <motion.div
                  className={`flex items-center justify-between text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </motion.div>

                <motion.div
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-500 transition-colors duration-200"
                    whileHover={{ x: 3 }}
                  >
                    اقرأ المقال
                    <ArrowRight className="w-4 h-4 me-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Blog Posts */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 ${
              isDark
                ? "border-primary-600 text-primary-400 hover:bg-primary-600 hover:text-white"
                : "border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            عرض جميع مقالات المدونة
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
