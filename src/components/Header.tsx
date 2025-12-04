import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    // Listen for user changes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        try {
          setUser(JSON.parse(updatedUser));
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const navItems = [
    { name: "الرئيسية", href: "#home" },
    { name: "من نحن", href: "#about" },
    { name: "خدماتنا", href: "#services" },
    { name: "أعمالنا", href: "#work" },
    { name: "المشاريع الجاهزة", href: "#templates" },
    { name: "فريقنا", href: "#team" },
    { name: "الدورات", href: "#courses" },
    { name: "تواصل معنا", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${
              isDark ? "bg-gray-900/50" : "bg-white/50"
            } backdrop-blur shadow-lg`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 space-x-reverse"
            whileHover={{ scale: 1.05 }}
          >
            {isDark && isScrolled ? (
              <img src="/logo_dark.jpg" alt="ZH Logo" className="w-16 h-16" />
            ) : (
              <img src="/logo_light.jpg" alt="ZH Logo" className="w-16 h-16" />
            )}
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`${
                  isDark || !isScrolled
                    ? "hover:text-purple-400 text-white"
                    : "hover:text-purple-600 text-black"
                } transition-colors duration-200  font-medium`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Theme Toggle & Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Section */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <span
                  className={`text-sm font-medium ${
                    isDark || !isScrolled ? "text-white" : "text-black"
                  }`}
                >
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-red-600/20 transition-colors"
                  title="تسجيل الخروج"
                >
                  <LogOut
                    className={`w-5 h-5 ${
                      isDark || !isScrolled ? "text-red-400" : "text-red-600"
                    }`}
                  />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className={`hidden md:block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark || !isScrolled
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                تسجيل الدخول
              </button>
            )}

            <label className="inline-flex items-center relative">
              <input
                className="peer hidden"
                id="toggle"
                type="checkbox"
                checked={isDark}
                onClick={toggleTheme}
              />
              <div className="relative w-[77px] h-[40px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[30px] after:h-[30px] after:bg-primary-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5.5px] active:after:w-[50px] peer-checked:after:right-[7px]  shadow-sm duration-500 after:duration-500 after:shadow-md" />
              <svg
                height={0}
                width={100}
                viewBox="0 0 24 24"
                data-name="Layer 1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white peer-checked:opacity-60 absolute w-4 h-4 left-[13px]"
              >
                <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z" />
              </svg>

              <svg
                height={512}
                width={512}
                viewBox="0 0 24 24"
                data-name="Layer 1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-4 h-4 right-[13px]"
              >
                <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z" />
              </svg>
            </label>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isDark
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          className={`md:hidden overflow-hidden ${
            isDark ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 ${
                  isDark
                    ? "text-gray-300 hover:text-purple-400 hover:bg-gray-800"
                    : "text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                } rounded-lg transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-700 pt-2 mt-2 p-2">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm font-medium">
                    {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-right px-4 py-2 ${
                      isDark
                        ? "text-red-400 hover:bg-red-600/20"
                        : "text-red-600 hover:bg-red-100"
                    } rounded-lg transition-colors`}
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className={`block w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    isDark
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  تسجيل الدخول
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
