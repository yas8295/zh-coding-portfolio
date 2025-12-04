import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../hooks/authHooks/useLogin";

interface LoginPageProps {
  isDark: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ isDark }) => {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(
      { data: formData },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      } transition-colors duration-300 flex items-center justify-center relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-l from-purple-600/10 to-pink-600/10"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-6 py-12"
      >
        {/* Logo */}{" "}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to="/">
            <img
              src="/logo_light.jpg"
              alt="ZH Logo"
              className="w-20 h-20 mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ZH-CODING
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            مرحباً بك في منصتنا
          </p>
        </motion.div>
        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`space-y-6 p-8 rounded-2xl backdrop-blur-sm ${
            isDark
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white/50 border border-gray-200"
          }`}
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-3 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              البريد الالكتروني
            </label>
            <div className="relative">
              <Mail
                className={`absolute right-4 top-3.5 w-5 h-5 ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="أدخل بريدك الالكتروني"
                className={`w-full pr-12 pl-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-3 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              كلمة المرور
            </label>
            <div className="relative">
              <Lock
                className={`absolute right-4 top-3.5 w-5 h-5 ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="أدخل كلمة المرور"
                className={`w-full pr-12 pl-12 py-3 rounded-xl border-2 transition-all duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute left-4 top-3.5 ${
                  isDark
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin">⚙️</span>
                جاري التحميل...
              </>
            ) : (
              <>
                تسجيل الدخول
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </motion.form>
        {/* Sign Up Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`text-center mt-8 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          ليس لديك حساب؟{" "}
          <Link
            to="/register"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold transition-colors"
          >
            إنشاء حساب جديد
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
