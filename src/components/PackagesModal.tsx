import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { usePackages } from "../hooks/packagesHooks/usePackages";
import { usePayment } from "../hooks/paymentsHooks/usePayment";
import { toast } from "react-toastify";

interface Package {
  id: number;
  name: string;
  price: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

interface PackagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: {
    id: number;
    name: string;
  } | null;
  isDark: boolean;
}

const PackagesModal: React.FC<PackagesModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate,
  isDark,
}) => {
  const user = JSON.parse(localStorage.getItem("token"))?.user;
  const { data: packages, isLoading: packagesLoading } = usePackages();
  const { submitPayment, isLoading: paymentLoading } = usePayment();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [buyerInfo, setBuyerInfo] = useState({
    buyer_name: user?.name,
    buyer_email: user?.email,
    buyer_phone: user?.phone,
  });

  const handlePurchase = () => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("يجب تسجيل الدخول أولاً لتتمكن من شراء الباقات");
      onClose();
      return;
    }

    if (!selectedPackage) {
      toast.error("يرجى اختيار باقة");
      return;
    }

    const paymentData = {
      project_id: selectedTemplate?.id,
      package_id: selectedPackage,
      ...buyerInfo,
    };

    submitPayment(paymentData, {
      onSuccess: () => {
        setSelectedPackage(null);
        setBuyerInfo({
          buyer_name: "",
          buyer_email: "",
          buyer_phone: "",
        });
        onClose();
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-4xl w-full rounded-3xl max-h-[90vh] overflow-y-auto ${
              isDark ? "bg-gray-800/60" : "bg-white"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="p-8 border-b border-gray-700">
              <h2
                className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                اختر باقتك
              </h2>
              <p
                className={`text-lg mt-2 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {selectedTemplate?.name}
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              {packagesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                </div>
              ) : (
                <>
                  {/* Packages Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {packages.map((pkg: Package) => (
                      <motion.div
                        key={pkg.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                          selectedPackage === pkg.id
                            ? "border-primary-600 bg-primary-600/10"
                            : isDark
                              ? "border-gray-700 bg-gray-700/50"
                              : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <h3
                          className={`text-xl font-bold mb-2 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {pkg.name}
                        </h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-primary-600">
                            {pkg.price}
                          </span>
                          <span
                            className={`text-sm ml-2 ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            ر.س
                          </span>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {pkg.features.map((feature: string, idx: number) => (
                            <li
                              key={idx}
                              className={`flex items-start gap-2 text-sm ${
                                isDark ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              <Check
                                size={16}
                                className="text-green-500 mt-0.5 flex-shrink-0"
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {selectedPackage === pkg.id && (
                          <div className="mt-4 p-2 rounded-lg bg-primary-600/20 text-primary-600 text-center text-sm font-semibold">
                            مختار ✓
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePurchase}
                      disabled={paymentLoading || !selectedPackage}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        paymentLoading || !selectedPackage
                          ? "opacity-50 cursor-not-allowed"
                          : "bg-gradient-to-r from-primary-600 to-primary-600 text-white hover:shadow-lg"
                      }`}
                    >
                      {paymentLoading ? "جاري المعالجة..." : "تأكيد الشراء"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        isDark
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                      }`}
                    >
                      إغلاق
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PackagesModal;
