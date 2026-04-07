import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Code2Icon,
  Instagram,
  Facebook,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerLinks = {
    company: [
      { name: "من نحن", href: "#about" },
      { name: "فريقنا", href: "#team" },
      { name: "تواصل معنا", href: "#contact" },
      { name: "المدونة", href: "/blog" },
    ],
    services: [
      { name: "تطوير المواقع", href: "#services" },
      { name: "تطبيقات الهاتف", href: "#services" },
      { name: "الاستضافات والسيرفرات", href: "#services" },
      { name: "تصميم واجهات المستخدم", href: "#services" },
      { name: "التسويق الرقمي (Digital Marketing)", href: "#services" },
      { name: "Automation", href: "#services" },
      { name: "تكامل الأنظمة والـ APIs", href: "#services" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/ZH-CODIING", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/zh-innovation-for-digital-solutions/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/zh_innovation?igsh=MXJtdW0yMXByczBvMQ==",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/18Rf1V87qU/",
      label: "Facebook",
    },
  ];

  const contactItems = [
    {
      icon: Mail,
      label: "البريد الإلكتروني",
      value: "info@zh-innovation.com",
      href: "mailto:info@zh-innovation.com",
    },
    {
      icon: Phone,
      label: "الهاتف",
      value: "+201557404012",
      href: "tel:+201557404012",
    },
    {
      icon: MapPin,
      label: "الموقع",
      value: "السلطان حسين، أمام شركة اتصالات، الاسماعيلية",
      href: "#contact",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-neutral-100 border-t border-primary-400 rounded-t-[20px]">
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-64 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mt-14 grid gap-8 xl:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <img src="/logo.png" alt="ZH Logo" className="w-36" />
            <p className="mt-6 max-w-md text-neutral-400 leading-7">
              فريقنا يصمم ويتقن حلول الويب والتطبيقات لتسريع نمو العلامات
              التجارية ويمنحها حضورًا رقميًا مختلفًا.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-neutral-900/70 text-neutral-300 transition hover:-translate-y-1 hover:bg-primary-500/15 hover:text-primary-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white">روابط سريعة</h3>
            <ul className="mt-6 space-y-4 text-neutral-400">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="transition hover:text-primary-300"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="transition hover:text-primary-300"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white">خدماتنا</h3>
            <ul className="mt-6 space-y-4 text-neutral-400">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="transition hover:text-primary-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-[28px] border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-neutral-950/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-300">
              جاهز للانطلاق؟
            </p>
            <h3 className="mt-4 text-2xl font-bold text-white">
              دعنا نصنع شيئًا مدهشًا معًا
            </h3>
            <p className="mt-4 text-neutral-400 leading-7">
              سواء كان موقعًا جديدًا أو مشروعًا رقميًا، لدينا الخبرة لصنع تجربة
              مستخدم مبهرة.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-200 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5"
            >
              تواصل الآن
            </a>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-neutral-950/60 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-neutral-400">
            &copy; {currentYear} ZH-innovation. جميع الحقوق محفوظة.
          </div>
          <div className="inline-flex items-center gap-3 text-neutral-400">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-neutral-900/70 text-primary-300">
              <Code2Icon className="h-5 w-5" />
            </span>
            <span>تصميم وبرمجة بخبرة واهتمام بالتفاصيل.</span>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed left-6 bottom-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-200 text-neutral-950 shadow-2xl shadow-primary-500/20 transition-transform duration-300 hover:-translate-y-1"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}

      <motion.a
        href="https://wa.me/201557404012"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30 transition-transform duration-300 hover:-translate-y-1"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp className="h-8 w-8" />
      </motion.a>
    </footer>
  );
};

export default Footer;
