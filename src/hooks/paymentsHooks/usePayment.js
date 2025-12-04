import { useMutation } from "react-query";
import { toast } from "react-toastify";

const submitPayment = async (paymentData) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/payments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    }
  );

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "An unknown error occurred");
  }
  return responseData;
};

export const usePayment = () => {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: submitPayment,
    onSuccess: () => {
      toast.success(
        "تم تقديم طلبك وجاري مراجعته وسيتم التواصل معك في اقرب وقت"
      );
    },
    onError: (error) => {
      const errorMessage = error.message.replace("Error: ", "");
      toast.error(errorMessage || "حدث خطأ أثناء معالجة الدفع");
    },
  });

  return {
    submitPayment: mutate,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
