import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  ChevronLeft,
  MessageCircle,
  Send,
  Loader,
} from "lucide-react";
import { useBlogDetail } from "../hooks/blogHooks/useBlogDetail";
import { useAddComment } from "../hooks/blogHooks/useComments";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaChevronLeft } from "react-icons/fa";

interface BlogDetailPageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  isDark,
  toggleTheme,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blog, loading, error } = useBlogDetail(id);
  const addCommentMutation = useAddComment(Number(id));

  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const isAuthenticated = !!localStorage.getItem("token");

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!commentText.trim()) return;

    try {
      await addCommentMutation.mutateAsync({
        comment_text: commentText,
        parent_id: replyingTo || undefined,
      });

      setCommentText("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <div className="container mx-auto px-6 py-24">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-neutral-300 rounded-lg"></div>
            <div className="h-8 bg-neutral-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-300 rounded"></div>
              <div className="h-4 bg-neutral-300 rounded"></div>
              <div className="h-4 bg-neutral-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={`min-h-screen relative ${isDark ? "dark" : ""}`}>
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <div
          className={`container mx-auto px-6 py-24 text-center ${
            isDark ? "bg-neutral-900" : "bg-white"
          }`}
        >
          <p className="text-red-500 text-xl">خطأ: لم نتمكن من تحميل المقالة</p>
          <button
            onClick={() => navigate(-1)}
            className="absolute end-8 top-8 w-12 h-12 rounded-full bg-white flex items-center justify-center"
          >
            <FaChevronLeft className="w-5 h-5" />{" "}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen dark:bg-neutral-900 bg-white ${isDark ? "dark" : ""}`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Article Content */}
      <article
        className={isDark ? "bg-neutral-900 pt-10 px-3" : "bg-white pt-10 px-3"}
      >
        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 md:h-[500px] overflow-hidden mx-auto max-w-5xl rounded-2xl border border-neutral-300 dark:border-neutral-700"
        >
          <img
            src={`${import.meta.env.VITE_REACT_APP_API_URL}${blog.image}`}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/800x500?text=Blog+Article";
            }}
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute end-8 top-8 w-12 h-12 rounded-full bg-white flex items-center justify-center"
          >
            <FaChevronLeft className="w-5 h-5" />{" "}
          </button>
        </motion.div>

        <div className="mx-auto py-16 max-w-5xl">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1
              className={`text-4xl md:text-5xl  mb-6 ${
                isDark ? "text-white" : "text-neutral-900"
              }`}
            >
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div
              className={`flex flex-wrap items-center gap-6 pb-6 border-b ${
                isDark
                  ? "text-neutral-400 border-neutral-700"
                  : "text-neutral-600 border-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{blog.user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(blog.created_at).toLocaleDateString("en-GB")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{blog.comments?.length || 0} تعليق</span>
              </div>
            </div>
          </motion.div>

          {/* Article Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p
              className={`text-lg leading-9 mb-8 ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              {blog.description}
            </p>
          </motion.div>

          {/* Comments Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8"
          >
            <h2
              className={`text-3xl  mb-8 ${
                isDark ? "text-white" : "text-neutral-900"
              }`}
            >
              التعليقات ({blog.comments?.length || 0})
            </h2>

            {/* Comment Form */}
            <div
              className={`rounded-2xl p-6 mb-8 ${
                isDark ? "bg-neutral-800" : "bg-neutral-50"
              }`}
            >
              {!isAuthenticated ? (
                <div className="text-center">
                  <p
                    className={`mb-4 ${
                      isDark ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    يجب تسجيل الدخول لإضافة تعليق
                  </p>
                  <Link
                    to="/login"
                    className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300"
                  >
                    تسجيل الدخول
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={
                      replyingTo ? "اكتب ردك..." : "اكتب تعليقك هنا..."
                    }
                    rows={4}
                    className={`w-full p-4 rounded-xl border-2 resize-none transition-all duration-300 ${
                      isDark
                        ? "bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-500"
                        : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 focus:border-primary-500"
                    } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                  />

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={
                        addCommentMutation.isLoading || !commentText.trim()
                      }
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all duration-300 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                    >
                      {addCommentMutation.isLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          إرسال
                        </>
                      )}
                    </button>

                    {replyingTo && (
                      <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isDark
                            ? "bg-neutral-700 text-white hover:bg-neutral-600"
                            : "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                        }`}
                      >
                        إلغاء الرد
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`rounded-xl p-6 ${
                      isDark ? "bg-neutral-800" : "bg-neutral-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p
                          className={`font-bold ${isDark ? "text-white" : "text-neutral-900"}`}
                        >
                          {comment.user?.name || "مستخدم"}
                        </p>
                        <p
                          className={`text-xs ${
                            isDark ? "text-neutral-400" : "text-neutral-500"
                          }`}
                        >
                          {new Date(comment.created_at).toLocaleDateString(
                            "en-GB",
                          )}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`mb-4 ${
                        isDark ? "text-neutral-300" : "text-neutral-700"
                      }`}
                    >
                      {comment.comment_text}
                    </p>

                    {isAuthenticated && (
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className={`text-sm font-medium transition-all duration-300 ${
                          isDark
                            ? "text-primary-400 hover:text-primary-300"
                            : "text-primary-600 hover:text-primary-700"
                        }`}
                      >
                        الرد
                      </button>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-6 space-y-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`rounded-lg p-4 ml-6 border-r-2 ${
                              isDark
                                ? "bg-neutral-700 border-primary-500"
                                : "bg-white border-primary-500"
                            }`}
                          >
                            <p
                              className={`font-bold text-sm ${isDark ? "text-white" : "text-neutral-900"}`}
                            >
                              {reply.user?.name || "مستخدم"}
                            </p>
                            <p
                              className={`text-xs mb-2 ${
                                isDark ? "text-neutral-400" : "text-neutral-500"
                              }`}
                            >
                              {new Date(reply.created_at).toLocaleDateString(
                                "en-GB",
                              )}
                            </p>
                            <p
                              className={`text-sm ${
                                isDark ? "text-neutral-300" : "text-neutral-700"
                              }`}
                            >
                              {reply.comment_text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div
                  className={`text-center py-12 ${
                    isDark ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  <p>لا توجد تعليقات حتى الآن</p>
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </article>

      <Footer isDark={isDark} />
    </div>
  );
};

export default BlogDetailPage;
