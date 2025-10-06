import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Search, ServerCrash, Info } from "lucide-react";
import { useLinks } from "../hooks/linksHooks/useLinks";

interface LinksSectionProps {
  isDark: boolean;
}

interface LinkItem {
  id: number;
  url: string;
}

const LINKS_PER_PAGE = 12;

const LinksSection: React.FC<LinksSectionProps> = ({ isDark }) => {
  const { data: links, isLoading, isError, error, refetch } = useLinks();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(LINKS_PER_PAGE);

  const filteredLinks = useMemo(() => {
    if (!links) return [];
    return links.filter((link: LinkItem) =>
      link?.url?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }, [links, searchTerm]);

  useEffect(() => {
    setVisibleCount(LINKS_PER_PAGE);
  }, [searchTerm]);

  const visibleLinks = useMemo(
    () => filteredLinks.slice(0, visibleCount),
    [filteredLinks, visibleCount]
  );
  const hasMore = visibleCount < filteredLinks.length;

  const formatUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  if (isLoading) {
    return (
      <section
        id="links"
        className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-10 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded-md mb-12"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        id="links"
        className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            {(error as Error).message || "لم نتمكن من تحميل الروابط."}
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

  return (
    <section
      id="links"
      className={`py-20 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            روابط <span className="text-purple-600">لاعمالنا</span>
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            مجموعة من الروابط المفيدة التي قد تهمك.
          </p>
        </motion.div>

        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Search
            className={`absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="ابحث عن رابط..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 ps-10 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
              isDark
                ? "border-gray-700 bg-gray-900 text-white focus:border-purple-500"
                : "border-gray-300 bg-white text-gray-900 focus:border-purple-500"
            }`}
          />
        </motion.div>

        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleLinks.length > 0 ? (
            visibleLinks.map((link: LinkItem, index: number) => (
              <motion.a
                key={link?.id}
                href={formatUrl(link?.url)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-6 rounded-lg transition-all duration-300 ${
                  isDark
                    ? "bg-gray-900 hover:bg-gray-800"
                    : "bg-white hover:bg-gray-50"
                } border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } hover:shadow-lg hover:border-purple-500/50`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-4 flex-wrap gap-2">
                    <div
                      className={`p-3 rounded-full ${
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      } group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors`}
                    >
                      <Link
                        className={`w-6 h-6 text-wrap ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        } transition-colors`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-gray-800"
                      } group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors`}
                    >
                      {link?.url}
                    </h3>
                  </div>
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    } truncate max-w-xs`}
                  >
                    {link?.url}
                  </span>
                </div>
              </motion.a>
            ))
          ) : (
            <motion.div
              className="text-center py-12 col-span-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Info
                className={`w-12 h-12 mx-auto mb-4 ${
                  isDark ? "text-blue-400" : "text-blue-500"
                }`}
              />
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                لا توجد نتائج مطابقة لبحثك.
              </p>
            </motion.div>
          )}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <motion.button
              onClick={() => setVisibleCount((prev) => prev + LINKS_PER_PAGE)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              تحميل المزيد
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LinksSection;
